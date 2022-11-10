import { GraphQLError } from "graphql";
import { conn } from "../../../../config/db";
import { GlobalVars } from "../../../../models/GlobalVars";
import { errorType } from "../../../../utils/errorType";
import { globalVarsType } from "../../../../utils/globalVarsType";
import { GlobalVarsReturn } from "./helper";

export const get_global_vars = async (): Promise<GlobalVarsReturn> => {
  try {
    const globalVarsRepo = conn.getRepository(GlobalVars);
    const school_year = await globalVarsRepo.findOne({
      where: { identifier: globalVarsType.school_year },
    });
    if (!school_year) {
      throw new GraphQLError("Ño schoolyear found in global vars", {
        extensions: {
          code: errorType.CONFIG_ERROR,
        },
      });
    }

    return {
      school_year,
    };
  } catch (error) {
    throw new GraphQLError(error, {
      extensions: {
        code: errorType.SERVER_ERROR,
      },
    });
  }
};
