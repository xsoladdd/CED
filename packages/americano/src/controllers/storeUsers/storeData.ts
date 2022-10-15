import { conn } from "../../config/db";
import { StoreUser } from "../../models";
import { StoreData } from "../../models/StoreData";
import { StoreUserProfile } from "../../models/StoreUserProfile";
import { IError, IReturn, TypedRequestBody, TypedResponse } from "../../types";
import { errorHandler } from "../../utils/errorHandler";
import { INewStoreAndProfileForm } from "./types";
import { newStoreAndProfileValidation } from "./validation";

export const setStoreDataAndUserProfile = async (
  req: TypedRequestBody<INewStoreAndProfileForm>,
  res: TypedResponse<
    IReturn<{
      user: Omit<StoreUser, "password">;
    }>
  >
) => {
  try {
    if (!req.ctx || !req.ctx.id) {
      return errorHandler("authentication", {
        message: "Invalid ID",
      });
    }
    await newStoreAndProfileValidation.validate(req.body).catch((err) => {
      errorHandler("validation", err);
    });

    const repo = conn.getRepository(StoreUser);
    const user = await repo.findOne({
      where: {
        id: req.ctx.id,
      },
    });

    if (!user) {
      return errorHandler("authentication", {
        message: "Invalid ID",
      });
    }

    const storeUserProfileRepo = conn.getRepository(StoreUserProfile);
    const {
      address,
      firstName,
      lastName,
      mobileNumber,
      storeName,
      description,
      landlineNumber,
      middleName,
    } = req.body;
    const profile: StoreUserProfile = {
      firstName,
      middleName,
      lastName,
      landlineNumber,
      mobileNumber,
      address,
      storeUser: user,
    };
    await storeUserProfileRepo.save(profile);

    const storeDataRepo = conn.getRepository(StoreData);

    const newStore: StoreData = {
      name: storeName,
      users: [user],
      description,
    };

    await storeDataRepo.save(newStore);
    const refetchedUser = await repo.findOne({
      where: {
        id: req.ctx.id,
      },
      relations: { profile: true, store: true },
    });
    // Error if no user found
    if (!refetchedUser) {
      return errorHandler("authentication", {
        message: "Invalid refetch ID ",
      });
    }
    return res.status(200).json({
      status: 1,
      data: {
        user: refetchedUser,
      },
    });
  } catch (error) {
    console.log(error);
    const { title, params }: IError = JSON.parse(error.message);
    return res.status(200).json({
      status: 0,
      error_title: title,
      error_params: params,
    });
  }
};
