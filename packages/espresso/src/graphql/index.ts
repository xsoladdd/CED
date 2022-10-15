import { buildSchema } from "type-graphql";
import { authMiddleware } from "./authMiddleware";

export const graphqlSchema = buildSchema({
  resolvers: [__dirname + "/resolvers/**/*.resolver.{ts,js}"],
  authChecker: authMiddleware,
});
