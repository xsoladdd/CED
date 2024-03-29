import { config } from "dotenv";
import { DataSource, DataSourceOptions } from "typeorm";
import { SeederOptions } from "typeorm-extension";
// import { NODE_ENV } from "../global";
config();

const options: SeederOptions & DataSourceOptions = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: false,
  // logging: NODE_ENV !== "production",
  entities: [__dirname + "/../models/**/*.{ts,js}"],
  migrations: [__dirname + "/../migrations/**/*.{ts,js}"],
  seeds: [__dirname + "/../models/seeds/**/*.seed.{ts,js}"],
  subscribers: [],
};

export const conn = new DataSource(options);
