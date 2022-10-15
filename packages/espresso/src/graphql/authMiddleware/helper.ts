import { ApolloError } from "apollo-server";
import { compareAsc } from "date-fns";
import { SignOptions, verify } from "jsonwebtoken";
import { redisClient } from "../../config/redis";
import { SECRET_KEY } from "../../global";

interface IDecryptedData {
  id: string;
  email: string;
  exp: number;
}

const signInOptions: SignOptions = {
  // RS256 uses a public/private key pair. The API provides the private key
  // to generate the JWT. The client gets a public key to validate the
  // signature
  algorithm: "HS512",
  expiresIn: "7d",
};

const verfiyJWT = (
  JWT: string
): { status: boolean; data: Omit<IDecryptedData, "exp"> } => {
  try {
    if (!SECRET_KEY) {
      throw new ApolloError("SERVER_ERROR. MISSING SECRET_KEY FROM ENV");
    }
    const decryptedData = verify(JWT, SECRET_KEY, signInOptions);
    const { exp, email, id } = decryptedData as IDecryptedData;
    const expirationTime = new Date(exp * 1000);

    if (compareAsc(expirationTime, new Date()) !== 1) {
      throw new ApolloError("AUTHENTICATION_ERROR. TOKEN_IS_EXPIRED");
    }
    return {
      status: true,

      data: { email: email, id: id },
    };
  } catch (error) {
    throw new ApolloError("AUTHENTICATION_ERROR. TOKEN_IS_EXPIRED");
  }
};

export const validateToken = async ({
  token,
}: {
  token: string;
}): Promise<string> => {
  // Separate bearer from token
  const JWT = token.split(" ")[1];
  // Verify JWT
  const isValid = verfiyJWT(JWT);
  // Return error if JWT verification fails
  if (!isValid) {
    throw new ApolloError("SERVER_ERROR. AUTHENTICATION_MIDDLEWARE");
  }
  const {
    data: { id },
  } = isValid;

  const getRed = await redisClient.get(`cred-${id}`);
  if (!getRed) {
    throw new ApolloError(
      "AUTHENTICATION_ERROR. TOKEN_IS_EXPIRED:NOT IN REDIS"
    );
  }
  return id;
};
