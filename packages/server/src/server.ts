import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { json } from "body-parser";
import cors from "cors";
import express from "express";
import { GraphQLFormattedError } from "graphql";
import http from "http";
import "reflect-metadata";
import { conn } from "./config/db";
import { NODE_ENV, PORT } from "./global";
import { generateTypeDefs, resolvers } from "./graphql";
import { Icontext } from "./types";
import JWT from "./utils/JWT";

/*
  SSL certificate is being manage by certbot with nginx proxy pass.
  no need to manage it in application level
*/

const main = async () => {
  await conn.initialize().catch((err) => {
    console.error(err);
  });

  const app = express();
  const typeDefs = await generateTypeDefs();
  const server = new ApolloServer<Icontext>({
    typeDefs,
    resolvers,
    // resolvers,
    formatError: (
      formattedError: GraphQLFormattedError
    ): GraphQLFormattedError => {
      return formattedError;
    },
  });
  await server.start();
  app.use(
    "/graphql",
    cors<cors.CorsRequest>({
      origin:
        NODE_ENV === "production"
          ? [
              // main
              "http://stjeromeemiliani.com/",
              "https://stjeromeemiliani.com/",
              // local
              "http://stjeromeemiliani.com:4050/",
              "https://stjeromeemiliani.com:4050/",
            ]
          : "*",
    }),
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

  const httpServer = http.createServer(app);

  await new Promise<void>((resolve) =>
    httpServer.listen(
      {
        port: PORT,
      },
      resolve
    )
  );
  console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
};

main();
