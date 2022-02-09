"use strict";
const { buildSchema } = require("graphql");
const express = require("express");
const { graphqlHTTP } = require("express-graphql");

const app = express();

const port = process.env.PORT || 3000;

const schema = buildSchema(`
type Query {
    "retorna un saludo al mundo"
    hello: String
    gretting: String
}

`);

const resolver = { hello: () => "Hello World", gretting: () => "saludando" };

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: resolver,
    graphiql: true,
  })
);

app.listen(port, () => console.log(`server on port ${port}`));
