import { hash } from "argon2";
import { Request, Response } from "express";
import { conn } from "../../config/db";
import { StoreUser } from "../../models";
import { StoreData } from "../../models/StoreData";
import { StoreUserProfile } from "../../models/StoreUserProfile";

export const dummy = async (_: Request, res: Response) => {
  const userRepo = conn.getRepository(StoreUser);
  // const permissionRepo = conn.getRepository(Permissions);
  // const storeAccountRepo = conn.getRepository(StoreAccounts);
  // const storeUserProfileRepo = conn.getRepository(StoreUserProfile);

  const user: Array<StoreUser> = [
    {
      email: "dummy6@gmail.com",
      password: await hash("20140023"),
    },
    {
      email: "dummy7@gmail.com",
      password: await hash("20140023"),
    },
    {
      email: "dummy8@gmail.com",
      password: await hash("20140023"),
    },
    {
      email: "dummy9@gmail.com",
      password: await hash("20140023"),
    },
    {
      email: "dummy10@gmail.com",
      password: await hash("20140023"),
    },
  ];
  await userRepo.save(user);
  // const savedPermission = await permissionRepo.save({ user: savedUser });

  // await storeAccountRepo.save({
  //   permission: savedPermission,
  //   create: true,
  //   delete: true,
  //   update: true,
  //   view: true,
  // });

  // const userProfile: StoreUserProfile = {
  //   address: "12341234",
  //   firstName: "john",
  //   lastName: "doe",
  //   mobileNumber: "09331423123",
  //   storeUser: savedUser,
  // };

  // await storeUserProfileRepo.save(userProfile);

  return res.send("hey");
};

export const dummy2 = async (_: Request, res: Response) => {
  const userRepo = conn.getRepository(StoreUser);

  const y = await userRepo.find({
    where: { email: "dummy1@gmail.com" },

    relations: {
      permission: {
        storeAccounts: true,
      },
      profile: true,
    },
  });
  console.log(y);
  return res.json(y);
};

export const dummy3 = async (_: Request, res: Response) => {
  const userRepo = conn.getRepository(StoreUser);
  const storeDataRepo = conn.getRepository(StoreData);
  // const storeAccountRepo = conn.getRepository(StoreAccounts);
  const storeUserProfileRepo = conn.getRepository(StoreUserProfile);

  // Create 1st Account with profile
  const user1: StoreUser = {
    email: "dummy31@gmail.com",
    password: await hash("20140023"),
  };
  const savedUser1 = await userRepo.save(user1);
  const userProfile1: StoreUserProfile = {
    address: "12341234",
    firstName: "john",
    lastName: "doe",
    mobileNumber: "09331423123",
    storeUser: savedUser1,
  };
  await storeUserProfileRepo.save(userProfile1);

  // Create 2nd Account with profile
  const user2: StoreUser = {
    email: "dummy32@gmail.com",
    password: await hash("20140023"),
  };
  const savedUser2 = await userRepo.save(user2);
  const userProfile2: StoreUserProfile = {
    address: "12341234",
    firstName: "jenny",
    lastName: "doe",
    mobileNumber: "09331423123",
    storeUser: savedUser2,
  };
  await storeUserProfileRepo.save(userProfile2);

  const store: StoreData = {
    description: "Lorem",
    name: "leron leron sinta",
    users: [savedUser1, savedUser2],
  };

  await storeDataRepo.save(store);

  return res.send("hey");
};

export const dummy4 = async (_: Request, res: Response) => {
  const storeDataRepo = conn.getRepository(StoreData);

  const y = await storeDataRepo.find({
    relations: {
      users: { profile: true },
    },
  });
  console.log(y);
  return res.json(y);
};
