import { config } from "dotenv";
import { DataSource } from "typeorm";
import { NODE_ENV } from "../global";
config();

export const conn = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: NODE_ENV !== "production",
  entities: [__dirname + "/../models/*.ts"],
  migrations: [__dirname + "/../migrations/*.ts"],
  subscribers: [],
});
