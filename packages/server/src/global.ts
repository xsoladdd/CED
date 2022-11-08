import { config } from "dotenv";

config();

export const NODE_ENV = process.env.NODE_ENV;
export const SECRET_KEY = process.env.SECRET_KEY;

export const REDIS_URI = process.env.REDIS_URI;
export const REDIS_EXP = 5000;

export const PORT = process.env.PORT || 4000;
