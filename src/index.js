import "core-js/stable";
import "regenerator-runtime/runtime";
import express from "express";
import graphqlHTTP from "express-graphql";

import schema from "./schema";
import { MOVE_MAP } from "./config";
import { connect } from "./database";

const PORT = process.env.PORT || 8000;
const app = express();
connect();

app.get("/", (_, res) => {
  res.json({
    api: "Nabucodonosor API GraphQL",
    version: "1.0",
    status: "working",
  });
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
