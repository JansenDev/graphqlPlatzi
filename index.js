"use strict";
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { buildSchema } = require("graphql");
const express = require("express");
const { graphqlHTTP } = require("express-graphql");

const { join } = require("path");
const { readFileSync } = require("fs");

const resolvers = require("./schema/resolvers");

const app = express();

const port = process.env.PORT || 3000;

const typeDefs = buildSchema(
  readFileSync(join(__dirname, "schema", "schema.graphql"), "utf-8")
);

app.use(
  "/graphql",
  graphqlHTTP({
    schema: typeDefs,
    rootValue: resolvers,
    graphiql: true,
  })
);

app.listen(port, () => console.log(`server on port ${port}`));
