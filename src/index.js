import express from "express";
import graphqlHTTP from "express-graphql";
import schema from "./schema";
import { connect } from "./database";

const app = express();
connect();

app.get('/', (req, res) => {
  res.json({
    api: 'Nabucodonosor API GraphQL',
    version: '1.0',
    status: 'working'
  })
});

app.use('/graphql', graphqlHTTP({
  graphiql: true,
  schema: schema,
  context: {
    messageId: 'test'
  }
}));

app.listen(8080, () => console.log('Server on port 3000'));