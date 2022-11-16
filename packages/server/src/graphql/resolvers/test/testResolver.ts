import { Resolvers } from "../../generated";

export const testResolver: Resolvers = {
  Query: {
    test: () => "test",
  },
};
