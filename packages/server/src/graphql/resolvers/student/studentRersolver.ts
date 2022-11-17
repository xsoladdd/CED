import { GraphQLError } from "graphql";
import { conn } from "../../../config/db";
import { Student } from "../../../models/Student/Student";
import { authorized } from "../../../utils/authorized";
import { errorType } from "../../../utils/errorType";
import { getSchoolYear } from "../../../utils/getSchoolYear";
import { Resolvers } from "../../generated";

export const studentRersolver: Resolvers = {
  Student: {
    status: async (student, _) => {
      const SY = await getSchoolYear();
      if (student.enrollment_records?.length !== 0) {
        const selected = student.enrollment_records?.filter(
          (student) => student?.SY === SY
        );
        if (selected?.length !== 0) {
          return "E";
        } else {
          return "A";
        }
      }
      return "NE";
    },
  },
  Query: {
    getStudents: async (_, { limit, offset }, ctx) => {
      try {
        authorized(ctx);
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
          order: {
            created_at: "DESC",
          },
        });
        const length = await studentRepo.count();

        return { students, length };
      } catch (error) {
        throw new GraphQLError(error, {
          extensions: {
            code: errorType.SERVER_ERROR,
          },
        });
      }
    },
    getStudent: async (_, { SID }, ctx) => {
      try {
        authorized(ctx);
        const studentRepo = conn.getRepository(Student);
        const student = await studentRepo.findOne({
          where: { id: SID },
          relations: {
            enrollment_records: true,
            parent_guardians: true,
            transfer_records: true,
            school_records: true,
            requirements: true,
            address: true,
          },
        });
        if (!student) {
          throw new GraphQLError("No student found", {
            extensions: {
              code: errorType.SERVER_ERROR,
            },
          });
        }
        return student;
      } catch (error) {
        throw new GraphQLError(error, {
          extensions: {
            code: errorType.SERVER_ERROR,
          },
        });
      }
    },
  },
  Mutation: {
    // updateStudentBasicInfo: async (_, { input, SID }, ctx) => {
    //   try {
    //     authorized(ctx);
    //     const studentRepo = conn.getRepository(Student);
    //     // Check if employee_id exist
    //     const selectedStudent = await studentRepo.findOne({
    //       where: { id: SID },
    //       relations: {
    //         enrollment_records: true,
    //         parent_guardians: true,
    //         transfer_records: true,
    //         school_records: true,
    //         requirements: true,
    //         address: true,
    //       },
    //     });
    //     if (!selectedStudent) {
    //       throw new GraphQLError("Invalid LRN number", {
    //         extensions: {
    //           code: errorType.SERVER_ERROR,
    //         },
    //       });
    //     }
    //     selectedStudent.email = input.email;
    //     selectedStudent.first_name = input.first_name;
    //     selectedStudent.last_name = input.last_name;
    //     if (input.middle_name) {
    //       selectedStudent.middle_name = input.middle_name;
    //     }
    //     if (input.birthday) {
    //       selectedStudent.birthday = input.birthday;
    //     }
    //     if (input.contact_number) {
    //       selectedStudent.contact_number = input.contact_number;
    //     }
    //     const savedStudent = await studentRepo.save(selectedStudent);
    //     return savedStudent;
    //   } catch (error) {
    //     throw new GraphQLError(error, {
    //       extensions: {
    //         code: errorType.SERVER_ERROR,
    //       },
    //     });
    //   }
    // },
  },
};
