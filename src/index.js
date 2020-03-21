import express from "express";
import graphqlHTTP from "express-graphql";
import serverless from "serverless-http";
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

app.use('/.netlify/functions/graphql', graphqlHTTP({
  graphiql: true,
  schema: schema,
  context: {
    messageId: 'test'
  }
}));

app.listen(3000, () => console.log('Server on port 3000'));

module.exports = app;
module.exports.handler = serverless(app);