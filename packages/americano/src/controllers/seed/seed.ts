import { Request, Response } from "express";
import { generateStoreUsers } from "../../db/seed/local/storeUsers";

export const runSeed = async (_: Request, res: Response) => {
  await generateStoreUsers();
  return res.send("done");
};
