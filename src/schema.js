import { makeExecutableSchema } from "graphql-tools";
import { resolvers } from "./resolvers";

const typeDefs = `
  scalar DateTime

  type Query {
    Movements: [Movement]
  }

  type Movement {
    _id: ID
    status: String
    created: DateTime
    updated: DateTime
  }

  type Mutation {
    createMovement : Movement
  }
`;

export default makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers: resolvers
})
