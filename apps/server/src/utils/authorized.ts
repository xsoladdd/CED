import { GraphQLError } from "graphql";
import { Icontext } from "../types";
import { errorType } from "./errorType";
import JWT from "./JWT";

export const authorized = async (
  context: Icontext
): Promise<{
  id: string;
  employee_id: string;
}> => {
  if (!context.token) {
    throw new GraphQLError("No access token provided", {
      extensions: {
        code: errorType.AUTHENTICATION_ERROR,
      },
    });
  }
  const verified = await JWT.verfiyJWT(context.token);
  return {
    employee_id: verified.data.employee_id,
    id: verified.data.id,
  };
};
