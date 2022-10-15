import { compareAsc } from "date-fns";
import { sign, SignOptions, verify } from "jsonwebtoken";
import { SECRET_KEY } from "../global";
import { convertEpochToTimestamp } from "./convertEpochToTimestamp";
import { errorHandler } from "./errorHandler";

const signInOptions: SignOptions = {
  // RS256 uses a public/private key pair. The API provides the private key
  // to generate the JWT. The client gets a public key to validate the
  // signature
  algorithm: "HS512",
  expiresIn: "7d",
};

export const generateJWT = (data: any): string => {
  try {
    if (!SECRET_KEY) {
      return errorHandler("authentication", { message: "SECRET_KEY is empty" });
    }
    return sign(data, SECRET_KEY, signInOptions);
  } catch (error) {
    return errorHandler(undefined, error);
  }
};

export const verfiyJWT = (JWT: string): boolean => {
  try {
    if (!SECRET_KEY) {
      return errorHandler("authentication", { message: "SECRET_KEY is empty" });
    }
    const decryptedData = verify(JWT, SECRET_KEY, signInOptions);
    const { exp } = decryptedData as { exp: number };
    const expirationTime = convertEpochToTimestamp(exp);
    if (compareAsc(expirationTime, new Date()) !== 1) {
      return errorHandler("authentication", { message: "Token is expire" });
    }
    return true;
  } catch (error) {
    return errorHandler("authentication", { message: "Token is expire" });
  }
};
