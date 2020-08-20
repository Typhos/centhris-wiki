const { ApolloServer, gql } = require("apollo-server-express");
const express = require("express");
const mongoose = require("mongoose");

const { typeDefs } = require("./schemas/typeDefs");
const { resolvers } = require("./resolvers");

require("dotenv").config();
const port = process.env.PORT || 8081;

const startServer = async () => {
  app = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    tracing: true,
    cors: true,
    playground: process.env.NODE_ENV === "production" ? false : true,
  });

  server.applyMiddleware({ app });

  await mongoose.connect(
    `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_URI}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );

  if (process.env.NODE_ENV === "production") {
    app.use(express.static("./client/build"));
  }

  app.listen({ port: port }, () =>
    console.log(
      `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
    )
  );
};

startServer();
