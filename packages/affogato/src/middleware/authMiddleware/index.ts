import { NextFunction, Response } from "express";
import { redisClient } from "../../config/redis";
import { TypedRequest } from "../../types";
import { errorHandler } from "../../utils/errorHandler";
import { verfiyJWT } from "./helper";

export const authMiddleware = async (
  req: TypedRequest,
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

    // Proceed
    return next();
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 0,
      error_title: error.title,
      error_params: error.params ? error.params : {},
    });
  }
};
