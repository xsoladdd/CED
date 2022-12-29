import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { json } from "body-parser";
import cors from "cors";
import express from "express";
import { GraphQLFormattedError } from "graphql";
import http from "http";
import https from "https";
import fs from "fs";

import "reflect-metadata";
import { conn } from "./config/db";
import { NODE_ENV, PORT } from "./global";
import { generateTypeDefs, resolvers } from "./graphql";
import { Icontext } from "./types";
import JWT from "./utils/JWT";

const main = async () => {
  await conn.initialize().catch((err) => {
    console.error(err);
  });

  const configurations = {
    // Note: You may need sudo to run on port 443
    production: {
      ssl: true,
      port: 443,

      hostname: "https://stjeromeemiliani.com/",
    },
    development: { ssl: false, port: 4000, hostname: "localhost" },
  };
  const environment = NODE_ENV as "development" | "production";
  const config: { ssl: boolean; port: number; hostname: string } =
    configurations[environment];

  const app = express();
  // const httpServer = http.createServer(app);
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

  let httpServer: http.Server<
    typeof http.IncomingMessage,
    typeof http.ServerResponse
  >;
  if (config.ssl) {
    // Assumes certificates are in a .ssl folder off of the package root.
    // Make sure these files are secured.
    httpServer = https.createServer(
      {
        key: fs.readFileSync(`./ssl/${environment}/key.pem`),
        cert: fs.readFileSync(`./ssl/${environment}/cert.pem`),
      },

      app
    );
  } else {
    httpServer = http.createServer(app);
  }

  await new Promise<void>((resolve) =>
    httpServer.listen(
      {
        port: PORT,
        // key: "",
        // cert: "",
      },
      resolve
    )
  );
  console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
};

main();
