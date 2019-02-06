const { ApolloServer, PubSub } = require("apollo-server-express");
const { createServer } = require("http");
const express = require("express");
const expressPlayground = require("graphql-playground-middleware-express").default;
const { readFileSync } = require("fs");
const mongoose = require("mongoose");
require("dotenv").config();

const Message = require("./models/Message");

const typeDefs = readFileSync("./schema.graphql", "UTF-8");
const resolvers = require("./resolvers");

const app = express();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
mongoose.connection.on("connected", () => console.log(`mongodb connected`));
mongoose.connection.on("error", error => console.log(error.message));

const pubsub = new PubSub();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    Message,
    pubsub
  }
});

server.applyMiddleware({
  app,
  cors: { origin: "http://localhost" }
});

app.get(
  "/playground",
  expressPlayground({
    endpoint: "/graphql",
    subscriptionEndpoint: `ws://localhost:4000${server.graphqlPath}`
  })
);

const httpServer = createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen({ port: 4000 }, () => {
  console.log(
    `GraphQL Server running @ http://localhost:4000${server.graphqlPath}`
  );
});



