import express, { json } from "express";
import "reflect-metadata";
import { conn } from "./config/db";
import { SERVER_PORT } from "./global";
import { privateRoutes, publicRoutes } from "./routes";
import cors from "cors";
import { redisClient } from "./config/redis";

const main = async () => {
  const app = express();
  app.use(
    cors({
      allowedHeaders: "*",
    })
  );
  await conn.initialize().catch((err) => {
    console.error(err);
  });
  redisClient.on("error", (err) => {
    throw new Error(err);
  });

  await redisClient.connect();

  app.use(json());
  app.get("/", async (_, res) => {
    res.status(200).send("Welcome.");
  });

  app.use("/api/", publicRoutes);
  app.use("/api/", privateRoutes);

  const port = SERVER_PORT || 4000;
  app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
  });
};

main();
