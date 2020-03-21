import { tasks } from "./sample";
import Movement from "./models/movement";
import GraphQLDateTime from "graphql-type-datetime";

export const resolvers = {
  DateTime: GraphQLDateTime,
  Query: {
    async Movements() {
      const movements = await Movement.find();
      return movements;
    }
  },
  Mutation: {
    async createMovement() {
      const newMovement = new Movement({ status: 'created' });
      await newMovement.save();
      return newMovement;
    }
  }
}