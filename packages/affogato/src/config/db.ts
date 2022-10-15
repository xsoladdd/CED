import { config } from "dotenv";
import mongoose, { connect } from "mongoose";
import { errorHandler } from "../utils/errorHandler";
config();

export const conn = new Promise<Promise<typeof mongoose>>((resolve, reject) => {
  try {
    const MDB_URI = process.env.MDB_URI;
    if (!MDB_URI) {
      return errorHandler("configuration", { message: "MDB_URI not found" });
    }

    const connection = connect(MDB_URI);
    console.log(`Connected`);
    return resolve(connection);
  } catch (error) {
    reject(error);
  }
});
