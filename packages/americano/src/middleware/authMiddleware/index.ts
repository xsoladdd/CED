import { NextFunction, Response } from "express";
import { redisClient } from "../../config/redis";
import { IError, TypedRequestBody } from "../../types";
import { errorHandler } from "../../utils/errorHandler";
import { verfiyJWT } from "./helper";

export const authMiddleware = async (
  req: TypedRequestBody,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get full bearer token
    const auth = req.headers.authorization;
    // Check if authorization is passed as header
    if (!auth) {
      return errorHandler("authentication", { message: "No token provided" });
    }
    // Separate bearer from token
    const JWT = auth.split(" ")[1];
    // Verify JWT
    const isValid = verfiyJWT(JWT);
    // Return error if JWT verification fails
    if (!isValid) {
      return errorHandler(undefined, {
        message: "Something went wrong in authMiddleware",
      });
    }
    const {
      data: { id },
    } = isValid;

    req.ctx = { ...req.ctx, id };

    const getRed = await redisClient.get(`cred-${id}`);
    if (!getRed) {
      return errorHandler("authentication", {
        message: "Relogin again to continue",
      });
    }
    // Check if token is not the latest one
    if (getRed !== JWT) {
      return errorHandler("authentication", {
        message: "You're using the old JWT",
      });
    }

    // Proceed
    return next();
  } catch (error) {
    console.log(error);
    const { title, params }: IError = JSON.parse(error.message);
    res.status(400).json({
      status: 0,
      error_title: title,
      error_params: params,
    });
  }
};
