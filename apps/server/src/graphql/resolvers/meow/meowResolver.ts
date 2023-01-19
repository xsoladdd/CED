import { authorized } from "../../../utils/authorized";
import { Resolvers } from "../../generated";

export const meowResolver: Resolvers = {
  Query: {
    meow: async (_, __, ctx) => {
      // console.log(x);
      // console.log(xx);
      // console.log(ctx);
      await authorized(ctx);
      return "";
    },
  },
};
