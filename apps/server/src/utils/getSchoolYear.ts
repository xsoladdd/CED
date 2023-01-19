import { GraphQLError } from "graphql";
import { conn } from "../config/db";
import { GlobalVars } from "../models/GlobalVars";
import { errorType } from "./errorType";
import { globalVarsType } from "./globalVarsType";

export const getSchoolYear = async (): Promise<string> => {
  const globalVarsRepo = conn.getRepository(GlobalVars);
  const SY = await globalVarsRepo.findOne({
    where: { identifier: globalVarsType.school_year },
  });
  if (!SY) {
    throw new GraphQLError("Cannot fetch school year from global vars", {
      extensions: {
        code: errorType.SERVER_ERROR,
      },
    });
  }
  return SY.value;
};
