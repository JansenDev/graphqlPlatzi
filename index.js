"use strict";
require("dotenv").config({ path: ".env" });
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { makeExecutableSchema } = require("@graphql-tools/schema");

const { join } = require("path");
const { readFileSync } = require("fs");

const resolvers = require("./schema/resolvers");

const app = express();
const port = process.env.PORT || 3000;

const typeDefs = readFileSync(
  join(__dirname, "schema", "schema.graphql"),
  "utf-8"
);

// makeExecutableSchema tiene mejores caracteristicas que buildSchema de modulo 'graphql'
const schema = makeExecutableSchema({
  typeDefs, // Obligatorio para que funcione la applicacion
  resolvers, //Los resolvers son opcionales
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.listen(port, () => console.log(`server on port ${port}`));
