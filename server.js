const { ApolloServer, gql } = require("apollo-server-express");
const express = require("express");
const mongoose = require("mongoose");

const { typeDefs } = require("./schemas/typeDefs");
const { resolvers } = require("./resolvers");

require("dotenv").config();
const config = require("./config");
const port = process.env.PORT || config.server_port || 8081;

const startServer = async () => {
  app = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  server.applyMiddleware({ app });

  await mongoose.connect(config.db.mongodb_uri || process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

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
