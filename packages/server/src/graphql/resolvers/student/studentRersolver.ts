import { GraphQLError } from "graphql";
import { conn } from "../../../config/db";
import { Student } from "../../../models/Student/Student";
import { authorized } from "../../../utils/authorized";
import { errorType } from "../../../utils/errorType";
import { Resolvers } from "../../generated";

export const studentRersolver: Resolvers = {
  Query: {
    getStudents: async (_, { limit, offset, search }, ctx) => {
      try {
        const { employee_id } = authorized(ctx);
        console.log(search, employee_id);
        const studentRepo = conn.getRepository(Student);
        const students = await studentRepo.find({
          where: {},
          relations: {
            transfer_records: true,
            enrollment_records: true,
            address: true,
            parent_guardians: true,
            school_records: true,
          },
          skip: offset ? offset : 0,
          take: limit ? limit : 10,
        });
        return students;
      } catch (error) {
        throw new GraphQLError(error, {
          extensions: {
            code: errorType.SERVER_ERROR,
          },
        });
      }
    },
    getStudent: async (_, { LRN }, ctx) => {
      try {
        authorized(ctx);
        const studentRepo = conn.getRepository(Student);
        const students = await studentRepo.findOne({
          where: { LRN },
          relations: {
            transfer_records: true,
            enrollment_records: true,
            address: true,
            parent_guardians: true,
            school_records: true,
          },
        });
        return students;
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
