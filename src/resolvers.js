import { tasks } from "./sample";
import Movement from "./models/movement";
import GraphQLDateTime from "graphql-type-datetime";

export const resolvers = {
  DateTime: GraphQLDateTime,
  Query: {
    hello: () => { return 'Hello World with Graphql :)' },
    greet(root, { name }, ctx) {
      console.log(ctx);
      return `Hello ${name}`
    },
    tasks() {
      return tasks;
    },
    async Movements() {
      const movements = await Movement.find();
      return movements;
    }
  },
  Mutation: {
    createTask(_, { input }) {
      input._id = tasks.length;
      tasks.push(input)
      return input;
    },
    async createMovement() {
      const newMovement = new Movement({ status: 'created' });
      await newMovement.save();
      return newMovement;
    }
  }
}