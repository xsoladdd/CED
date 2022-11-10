import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { json } from "body-parser";
import cors from "cors";
import express from "express";
import { GraphQLFormattedError } from "graphql";
import http from "http";
import "reflect-metadata";
import { conn } from "./config/db";
import { PORT } from "./global";
import { generateSchema } from "./graphql/generateSchema";
import { Icontext } from "./types";
import JWT from "./utils/JWT";

const main = async () => {
  await conn.initialize().catch((err) => {
    console.error(err);
  });

  const app = express();
  const httpServer = http.createServer(app);
  const schema = await generateSchema();
  const server = new ApolloServer<Icontext>({
    schema,
    formatError: (
      formattedError: GraphQLFormattedError
      // error: unknown
    ): GraphQLFormattedError => {
      return formattedError;
    },
  });
  await server.start();
  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        if (req.headers?.authorization) {
          const token = req.headers?.authorization as string;
          const { employee_id, id } = JWT.verfiyJWT(token).data;
          const context: Icontext = {
            token,
            employee_id,
            id,
          };
          return context;
        }
        return {};
      },
    })
  );

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: PORT }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:4000/graphql`);
};

main();
