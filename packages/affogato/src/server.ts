import express, { json, Response } from "express";
import "reflect-metadata";
import { redisClient } from "./config/redis";
import { SERVER_PORT } from "./global";
import { authMiddleware } from "./middleware/authMiddleware";
import { privateRoutes, publicRoutes } from "./routes";
import { TypedRequest } from "./types";

const main = async () => {
  const app = express();

  await redisClient.connect();
  redisClient.on("error", (err) => {
    throw new Error(err);
  });

  app.use(json());
  app.get("/", authMiddleware, (req: TypedRequest, res: Response) => {
    console.log(req.ctx);
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
