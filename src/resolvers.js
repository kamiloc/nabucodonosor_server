import GraphQLDateTime from "graphql-type-datetime";
import { connect as mqttConnect } from "mqtt";

import Movement from "./models/movement";
import { MOVE_MAP, WS_URL } from "./config";

export const resolvers = {
  DateTime: GraphQLDateTime,
  Query: {
    async Movements() {
      const movements = await Movement.find();
      return movements;
    },
  },
  Mutation: {
    async createMovement() {
      const newMovement = new Movement({ status: "created" });
      const mqttClient = mqttConnect(WS_URL);

      mqttClient.on("connect", () => {
        console.log(">>> Mqtt connected succefull");

        mqttClient.publish("move", MOVE_MAP[process.env.MOVE_INDEX || 0], (err) => {
          if (err) {
            console.log(">>> Error on publish topic");
            console.log(err);
          } else {
            console.log(">>> Message published");
          }

          mqttClient.end();
        });
      });

      await newMovement.save();
      return newMovement;
    },
  },
};
