import { GraphQLError } from "graphql";
import { In } from "typeorm";
import { conn } from "../../../config/db";
import { GlobalVars } from "../../../models/GlobalVars";
import { EnrolledRecords } from "../../../models/Student/EnrolledRecords";
import { authorized } from "../../../utils/authorized";
import { errorType } from "../../../utils/errorType";
import { globalVarsType } from "../../../utils/globalVarsType";
import { Resolvers } from "../../generated";

export const dashboardResolver: Resolvers = {
  Query: {
    getDashboardCardInfo: async (_, __, ctx) => {
      try {
        await authorized(ctx);
        const enrolledRecordsRepo = conn.getRepository(EnrolledRecords);
        const globalVarsRepo = conn.getRepository(GlobalVars);
        const school_year = await globalVarsRepo.findOne({
          where: {
            identifier: globalVarsType.school_year,
          },
        });
        const SY = school_year?.value;

        const total_count = await enrolledRecordsRepo.count({
          where: {
            SY: SY ? SY : "",
            // grade_level_id: In(["1", "2", "3", "4", "5", "6"]),
          },
        });
        const elem_count = await enrolledRecordsRepo.count({
          where: {
            SY: SY ? SY : "",
            grade_level_id: In(["1", "2", "3", "4", "5", "6"]),
          },
        });

        const pre_elem_count = await enrolledRecordsRepo.count({
          where: {
            SY: SY ? SY : "",
            grade_level_id: In(["K", "P"]),
          },
        });

        const hs_count = await enrolledRecordsRepo.count({
          where: {
            SY: SY ? SY : "",
            grade_level_id: In(["7", "8", "9", "10"]),
          },
        });

        const shs_count = await enrolledRecordsRepo.count({
          where: {
            SY: SY ? SY : "",
            grade_level_id: In(["11", "12"]),
          },
        });

        return {
          total_count,
          pre_elem_count,
          elem_count,
          hs_count,
          shs_count,
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
