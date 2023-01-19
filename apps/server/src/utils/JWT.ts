import { add, compareAsc, format } from "date-fns";
import { GraphQLError } from "graphql";
import { sign, SignOptions, verify } from "jsonwebtoken";
import { SECRET_KEY } from "../global";
import { Employee } from "../models/Employee/Employee";
import { errorType } from "./errorType";
import { recordTrail } from "./recordTrail";

const signInOptions: SignOptions = {
  // RS256 uses a public/private key pair. The API provides the private key
  // to generate the JWT. The client gets a public key to validate the
  // signature
  algorithm: "HS512",
  // expiresIn: "1000",
};

const generateJWT = (data: Employee): string => {
  try {
    if (!SECRET_KEY) {
      throw new GraphQLError("Cannot found secret key", {
        extensions: {
          code: errorType.CONFIG_ERROR,
        },
      });
    }
    const exp = format(
      add(new Date(), {
        hours: 8,
      }),
      "T"
    );

    return sign(
      { id: data.id, employee_id: data.employee_id, exp: parseInt(exp) },
      SECRET_KEY,
      signInOptions
    );
  } catch (error) {
    throw new GraphQLError(error, {
      extensions: {
        code: errorType.SERVER_ERROR,
      },
    });
  }
};

interface IDecryptedData {
  id: string;
  employee_id: string;
  exp: number;
}

const verfiyJWT = async (
  BearerJWT: string
): Promise<{ status: boolean; data: Omit<IDecryptedData, "exp"> }> => {
  try {
    if (!SECRET_KEY) {
      throw new GraphQLError("Cannot found secret key", {
        extensions: {
          code: errorType.CONFIG_ERROR,
        },
      });
    }
    const [, JWT] = BearerJWT.split(" ", 2);

    let decryptedData = verify(JWT, SECRET_KEY, signInOptions);
    const { exp, employee_id, id } = decryptedData as unknown as IDecryptedData;
    // Convert epoch to ms stamp
    const expirationTime = new Date(exp);

    if (compareAsc(expirationTime, new Date()) !== 1) {
      await recordTrail(employee_id, "Token expired", "LOGOUT");
      throw new GraphQLError("Token is expire", {
        extensions: {
          code: errorType.AUTHENTICATION_ERROR,
        },
      });
    }
    return {
      status: true,
      data: { employee_id, id },
    };
  } catch (error) {
    if (JSON.stringify(error).includes("invalid token")) {
      throw new GraphQLError("Invalid JSON web token", {
        extensions: {
          code: errorType.AUTHENTICATION_ERROR,
        },
      });
    }
    if (JSON.stringify(error).includes("expire")) {
      throw new GraphQLError("Token expired", {
        extensions: {
          code: errorType.TOKEN_EXPIRE_ERROR,
        },
      });
    }
    throw new GraphQLError(error, {
      extensions: {
        code: errorType.SERVER_ERROR,
      },
    });
  }
};

const JWT = {
  verfiyJWT,
  generateJWT,
};

export default JWT;
