import { GraphQLError } from "graphql";
import { conn } from "../../../config/db";
import { GlobalVars } from "../../../models/GlobalVars";
import { authorized } from "../../../utils/authorized";
import { errorType } from "../../../utils/errorType";
import { globalVarsType } from "../../../utils/globalVarsType";
import { recordTrailType } from "../../../utils/recordTrail";
import { Resolvers } from "../../generated";

export const globalVarResolver: Resolvers = {
  Query: {
    getGlobalVars: async (_, __, ctx) => {
      try {
        authorized(ctx);
        const repo = conn.getRepository(GlobalVars);
        const school_year = await repo.findOne({
          where: {
            identifier: globalVarsType.school_year,
          },
        });
        if (!school_year) {
          throw new GraphQLError(
            "SOMETHING WENT WRONG WITH SCHOOL YEAR FETCH",
            {
              extensions: {
                code: errorType.SERVER_ERROR,
              },
            }
          );
        }

        const audit_trail_type = Object.keys(recordTrailType);
        return {
          audit_trail_types: audit_trail_type,
          school_year: school_year.value,
        };
      } catch (error) {
        throw new GraphQLError(error, {
          extensions: {
            code: errorType.SERVER_ERROR,
          },
        });
      }
    },
  },
};
