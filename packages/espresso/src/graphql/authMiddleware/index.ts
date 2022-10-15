import { ApolloError } from "apollo-server";
import { AuthChecker } from "type-graphql";
import { IcontextObject } from "../../types";
import { validateToken } from "./helper";

export const authMiddleware: AuthChecker = async ({ context }) => {
  // here we can read the user from context
  // and check his permission in the db against the `roles` argument
  // that comes from the `@Authorized` decorator, eg. ["ADMIN", "MODERATOR"]

  const { token } = context as IcontextObject;
  if (token === "")
    throw new ApolloError("AUTHENTICATION_ERROR: NO_TOKEN_FOUND");

  const id = await validateToken({ token });
  console.log(id);
  context = { ...context, id };
  return true; // or false if access is denied
};
