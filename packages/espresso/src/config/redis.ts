import { createClient } from "redis";
import { REDIS_URI } from "../global";

export const redisClient = createClient({
  url: REDIS_URI,
});
