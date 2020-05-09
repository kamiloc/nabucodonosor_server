import "core-js/stable";
import "regenerator-runtime/runtime";
import express from "express";
import graphqlHTTP from "express-graphql";
import { connect as mqttConnect } from "mqtt";

import schema from "./schema";
import { MOVE_MAP, WS_URL } from "./config";
import { connect } from "./database";

const PORT = process.env.PORT || 8000;
const app = express();
connect();

const mqttClient = mqttConnect(WS_URL);
mqttClient.on("connect", () => {
  console.log(">>> Mqtt connected succefull");
});

app.get("/", (_, res) => {
  res.json({
    api: "Nabucodonosor API GraphQL",
    version: "1.0",
    status: "working",
  });
});

app.post("/move", (_, res) => {
  if (!mqttClient.connected) res.status(500).send("Mqtt client isn't connected");
  else {
    mqttClient.publish("move", MOVE_MAP[process.env.MOVE_INDEX || 0], (err) => {
      if (err) {
        console.log(">>> Error on publish topic");
        console.log(err);
        res.status(500).send({ response: err, message: "Move topic not published" });
      } else {
        res.status(200).send({ response: null, message: "Move topic published" });
      }
    });
  }
});

app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
    schema: schema,
    context: {
      messageId: MOVE_MAP[process.env.MOVE_INDEX || 0],
    },
  })
);

app.listen(PORT, () => console.log("Server on port " + PORT));
