import { GraphQLError } from "graphql";
import { conn } from "../../../config/db";
import { Student } from "../../../models/Student/Student";
import { authorized } from "../../../utils/authorized";
import { errorType } from "../../../utils/errorType";
import { getSchoolYear } from "../../../utils/getSchoolYear";
import { Resolvers } from "../../generated";
import { addStudentValidationSchema, mapUndefined } from "./helper";

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
    updateStudentBasicInfo: async (_, { input, SID }, ctx) => {
      try {
        authorized(ctx);
        const studentRepo = conn.getRepository(Student);
        // Check if employee_id exist
        const selectedStudent = await studentRepo.findOne({
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
        if (!selectedStudent) {
          throw new GraphQLError("Invalid LRN number", {
            extensions: {
              code: errorType.SERVER_ERROR,
            },
          });
        }
        selectedStudent.email = input.email;
        selectedStudent.first_name = input.first_name;
        selectedStudent.last_name = input.last_name;
        if (input.middle_name) {
          selectedStudent.middle_name = input.middle_name;
        }
        if (input.birthday) {
          selectedStudent.birthday = input.birthday;
        }
        if (input.contact_number) {
          selectedStudent.contact_number = input.contact_number;
        }
        const savedStudent = await studentRepo.save(selectedStudent);
        return savedStudent;
      } catch (error) {
        throw new GraphQLError(error, {
          extensions: {
            code: errorType.SERVER_ERROR,
          },
        });
      }
    },
    addStudent: async (_, { input }, ctx) => {
      try {
        authorized(ctx);
        const studentRepo = conn.getRepository(Student);
        await addStudentValidationSchema.validate(input).catch((err) => {
          throw new GraphQLError(err.message, {
            extensions: {
              code: errorType.VALIDATION_ERROR,
            },
          });
        });
        const {
          LRN,
          parent_guardians,
          school_records,
          address,
          requirements,
          middle_name,
          birthday,
          contact_number,
          email,
          ...rest
        } = input;

        const selectValidation = await studentRepo.count({
          where: {
            LRN,
          },
        });
        if (selectValidation !== 0) {
          throw new GraphQLError("LRN Already Exist", {
            extensions: {
              code: errorType.VALIDATION_ERROR,
            },
          });
        }

        const newStudent: Student = {
          ...rest,
          LRN,
          middle_name: mapUndefined(middle_name),
          birthday: mapUndefined(birthday),
          contact_number: mapUndefined(contact_number),
          email: mapUndefined(email),
          address: mapUndefined(address),
          parent_guardians: mapUndefined(parent_guardians),
          school_records: mapUndefined(school_records),
          requirements: mapUndefined(requirements),
        };

        const savedStudent = await studentRepo.save(newStudent);
        return savedStudent;
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
