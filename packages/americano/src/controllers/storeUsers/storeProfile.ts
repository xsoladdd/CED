import { conn } from "../../config/db";
import { StoreUser } from "../../models";
import { IError, IReturn, TypedRequestBody, TypedResponse } from "../../types";
import { errorHandler } from "../../utils/errorHandler";

export const getStoreProfile = async (
  req: TypedRequestBody<any>,
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
    const repo = conn.getRepository(StoreUser);
    const user = await repo.findOne({
      where: {
        id: req.ctx.id,
      },
      relations: { profile: true, store: true },
    });
    // Error if no user found
    if (!user) {
      return errorHandler("authentication", {
        message: "Invalid ID",
      });
    }
    const { password: _, ...trimmedUser } = user;
    return res.status(200).json({
      status: 1,
      data: {
        user: trimmedUser,
      },
    });
  } catch (error) {
    const { title, params }: IError = JSON.parse(error.message);
    return res.status(200).json({
      status: 0,
      error_title: title,
      error_params: params,
    });
  }
};
