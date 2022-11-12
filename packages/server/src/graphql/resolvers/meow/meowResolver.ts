import { authorized } from "../../../utils/authorized";
import { Resolvers } from "../../generated";

export const meowResolver: Resolvers = {
  Query: {
    meow: (_, __, ctx) => {
      authorized(ctx);
      console.log(ctx);
      return "";
    },
  },
};
