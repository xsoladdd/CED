import { ApolloError, ApolloServer } from "apollo-server";
import cors from "cors";
import express, { json } from "express";
import "reflect-metadata";
import { conn } from "./config/db";
import { redisClient } from "./config/redis";
import { SERVER_PORT } from "./global";
import { graphqlSchema } from "./graphql";
import { IcontextObject } from "./types";

const main = async () => {
  const app = express();
  const port = SERVER_PORT;
  app.use(json());
  app.use(
    cors({
      allowedHeaders: "*",
    })
  );

  await conn.initialize().catch((err) => {
    console.error(err);
  });

  await redisClient.connect();
  redisClient.on("error", (err) => {
    throw new Error(err);
  });

  const schema = await graphqlSchema;

  const apolloServer: ApolloServer = new ApolloServer({
    schema: schema,
    plugins: [],
    cors: { origin: true, credentials: false },

    formatError: (err) => {
      if (err.message.includes("jwt expired")) {
        return new ApolloError("TOKEN_EXPIRE_ERROR", "TOKEN_EXPIRE_ERROR");
      }
      if (err.message.startsWith("Database Error: ")) {
        return new ApolloError("DATABASE_ERROR");
      }
      console.log(err);
      return new ApolloError(err.name, err.message);
    },
    context: ({ req }) => {
      const token = req.headers.authorization;
      const context: IcontextObject = {
        req,
        token: token ? token : "",
        id: "",
      };
      return context;
    },
  });

  await apolloServer.listen({ app, port });
};

main();
