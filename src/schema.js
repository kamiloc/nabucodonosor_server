import { makeExecutableSchema } from "graphql-tools";
import { resolvers } from "./resolvers";

const typeDefs = `
  scalar DateTime

  type Query {
    hello: String
    greet(name: String!): String
    tasks: [Task]
    Movements: [Movement]
  }

  type Task {
    _id: ID
    title: String!
    description: String!
    number: Int
  }

  type Movement {
    _id: ID
    status: String
    created: DateTime
    updated: DateTime
  }

  type Mutation {
    createTask(input: TaskInput): Task
    createMovement : Movement
  }

  input TaskInput{
    title: String!
    description: String!
    number: Int
  }
`;

export default makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers: resolvers
})
