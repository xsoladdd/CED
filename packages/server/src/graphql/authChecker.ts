import { GraphQLError } from "graphql";
import { AuthChecker } from "type-graphql";
import { Icontext } from "../types";
import { errorType } from "../utils/errorType";
import JWT from "../utils/JWT";

export const customAuthChecker: AuthChecker<Icontext> = ({
  context: { token },
}) => {
  if (!token) {
    throw new GraphQLError("Missing Token", {
      extensions: {
        code: errorType.VALIDATION_ERROR,
      },
    });
  }
  JWT.verfiyJWT(token);
  return true; // or false if access is denied
};
