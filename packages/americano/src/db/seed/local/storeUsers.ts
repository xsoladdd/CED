import { hash } from "argon2";
import { conn } from "../../../config/db";
import { NODE_ENV } from "../../../global";
import { StoreUser } from "../../../models";
import { Permissions } from "../../../models/Permissions/Permissions";

export const generateStoreUsers = async (): Promise<void> => {
  if (NODE_ENV === "development") {
    console.log("GENERATING LOCAL STORE USERS");
    const repo = conn.getRepository(StoreUser);
    const permissionRepo = conn.getRepository(Permissions);

    const user: Array<StoreUser> = [
      {
        email: "eofuntanar@gmail.com",
        password: await hash("20140023"),
      },
      {
        email: "armilwebdev@gmail.com",
        password: await hash("armilwebdev"),
      },
    ];

    const saved = await repo.save(user);
    await permissionRepo.save(saved.map((user): Permissions => ({ user })));
  }
};
