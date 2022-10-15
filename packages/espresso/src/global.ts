import { config } from "dotenv";

config();

export const SERVER_PORT = process.env.PORT || 4000;
export const NODE_ENV = process.env.NODE_ENV;
export const SECRET_KEY = process.env.SECRET_KEY;

export const REDIS_URI = process.env.REDIS_URI;
