import { verify } from "argon2";
import { conn } from "../../config/db";
import { redisClient } from "../../config/redis";
import { REDIS_EXP } from "../../global";
import { generateJWT } from "../../middleware/authMiddleware/helper";
import { StoreUser } from "../../models";
import { IError, IReturn, TypedRequestBody, TypedResponse } from "../../types";
import { errorHandler } from "../../utils/errorHandler";
import { IAuthForm } from "./types";
import { authFormValidation } from "./validation";

export const authStore = async (
  req: TypedRequestBody<IAuthForm>,
  res: TypedResponse<
    IReturn<{
      JWT: string;
      user: Omit<StoreUser, "password">;
    }>
  >
) => {
  try {
    await authFormValidation.validate(req.body).catch((err) => {
      errorHandler("validation", err);
    });
    const { email, password } = req.body;
    const storeUserRepo = conn.getRepository(StoreUser);
    const user = await storeUserRepo.findOne({
      where: { email },
    });

    if (!user) {
      return errorHandler("authentication", { message: "User not found" });
    }
    if (!user.is_active) {
      return errorHandler("authentication", {
        message:
          "Account has been suspended. please contact admin for more info",
      });
    }
    if (!(await verify(user.password, password))) {
      return errorHandler("authentication", {
        message: "Password is incorrect",
      });
    }

    const JWT = generateJWT({
      id: user.id,
      email: user.email,
    });
    const redSet = await redisClient.setEx(`cred-${user.id}`, REDIS_EXP, JWT);
    if (redSet !== "OK") {
      return errorHandler("authentication", { message: "REDIS error" });
    }
    const { password: _, ...trimmedUser } = user;
    return res.status(200).json({
      status: 1,
      data: {
        JWT,
        user: { ...trimmedUser },
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
