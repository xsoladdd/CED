import { buildSchema } from "type-graphql";
import { customAuthChecker } from "./authChecker";

export const generateSchema = async () => {
  const schema = await buildSchema({
    resolvers: [__dirname + "/**/*.resolver.ts"],
    validate: false,
    authChecker: customAuthChecker,
  });

  return schema;
};
