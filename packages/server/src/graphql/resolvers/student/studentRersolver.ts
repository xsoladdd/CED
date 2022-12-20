import { GraphQLError } from "graphql";
import { FindOptionsWhere, ILike, In } from "typeorm";
import { conn } from "../../../config/db";
import { EnrolledRecords } from "../../../models/Student/EnrolledRecords";
import { Student } from "../../../models/Student/Student";
import { StudentAddress } from "../../../models/Student/StudentAddress";
import { StudentParentGuardian } from "../../../models/Student/StudentParentGuardian";
import { StudentRequirements } from "../../../models/Student/StudentRequirements";
import { StudentSchoolRecord } from "../../../models/Student/StudentSchoolRecord";
import { authorized } from "../../../utils/authorized";
import { errorType } from "../../../utils/errorType";
import { getSchoolYear } from "../../../utils/getSchoolYear";
import { recordTrail } from "../../../utils/recordTrail";
import { Resolvers, StudentInput } from "../../generated";
import {
  addLeadingZeros,
  addStudentValidationSchema,
  addStudentsValidationSchema,
  mapUndefined,
} from "./helper";

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
  EnrolledRecord: {
    SID: async (enrolledRecord, _) => {
      const { SY, increment_id } = enrolledRecord as EnrolledRecords;
      if (increment_id) {
        const [year_id] = SY.split("-");
        const yearNumber = year_id.slice(-2); // if 2023, will return 23
        const formatIncrementId = addLeadingZeros(parseInt(increment_id), 6);
        return `${yearNumber}${formatIncrementId}`;
      }
      return ``;
    },
  },
  Query: {
    getStudents: async (_, { limit, offset, filter }, ctx) => {
      try {
        authorized(ctx);
        const studentRepo = conn.getRepository(Student);
        const searchString = filter.search
          ? ILike(`%${filter.search}%`)
          : undefined;
        const students = await studentRepo.find({
          relations: {
            transfer_records: true,
            enrollment_records: true,
            address: true,
            parent_guardians: true,
            school_records: true,
          },
          // where,
          where: filter.search
            ? [
                { first_name: searchString },
                { middle_name: searchString },
                { last_name: searchString },
                { LRN: searchString },
                { email: searchString },
              ]
            : {
                // ...filterStatus,
              },
          skip: offset ? offset : 0,
          take: limit ? limit : 10,
          order: {
            created_at: "DESC",
          },
        });
        const length = await studentRepo.count({
          where: filter.search
            ? [
                { first_name: searchString },
                { middle_name: searchString },
                { last_name: searchString },
                { LRN: searchString },
                { email: searchString },
              ]
            : {
                // ...filterStatus,
              },
        });

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
    checkUniqueLRN: async (_, { LRN, currentLRN }, ctx) => {
      try {
        authorized(ctx);
        const studentRepo = conn.getRepository(Student);
        if (currentLRN && currentLRN === LRN) {
          return true;
        }
        const studentCount = await studentRepo.count({
          where: { LRN },
        });

        return studentCount === 0;
      } catch (error) {
        throw new GraphQLError(error, {
          extensions: {
            code: errorType.SERVER_ERROR,
          },
        });
      }
    },
    getEnrolledList: async (_, { limit, offset, filter }, ctx) => {
      try {
        authorized(ctx);

        const enrolledRepo = conn.getRepository(EnrolledRecords);
        const SY = await getSchoolYear();
        const searchString = filter.search
          ? ILike(`%${filter.search}%`)
          : undefined;

        const commonFilter: FindOptionsWhere<EnrolledRecords> = {
          SY: SY,
          status: filter.status ? ILike(`%${filter.status}%`) : undefined,
          section_id: filter.section ? ILike(`%${filter.section}%`) : undefined,
          grade_level_id: filter.year_level
            ? ILike(`%${filter.year_level}%`)
            : undefined,
        };

        const where = filter.search
          ? [
              {
                student: {
                  first_name: searchString,
                },
                ...commonFilter,
              },
              {
                student: {
                  middle_name: searchString,
                },
                ...commonFilter,
              },
              {
                student: {
                  last_name: searchString,
                },
                ...commonFilter,
              },
              // {
              //   increment_id: searchString,
              //   ...commonFilter,
              // },
              {
                student: {
                  email: searchString,
                },
                ...commonFilter,
              },
            ]
          : [{ ...commonFilter }];
        const enrolledRecords = await enrolledRepo.find({
          relations: {
            student: {
              transfer_records: true,
              enrollment_records: true,
              address: true,
              parent_guardians: true,
              school_records: true,
            },
          },
          where,
          skip: offset ? offset : 0,
          take: limit ? limit : 10,
          order: {
            created_at: "DESC",
          },
        });
        const length = await enrolledRepo.count({
          where,
        });

        return { enrolledRecords, length };
      } catch (error) {
        throw new GraphQLError(error, {
          extensions: {
            code: errorType.SERVER_ERROR,
          },
        });
      }
    },
    getEnrolledArchiveList: async (_, { limit, offset, filter }, ctx) => {
      try {
        authorized(ctx);
        const searchString = filter.search
          ? ILike(`%${filter.search}%`)
          : undefined;
        const enrolledRepo = conn.getRepository(EnrolledRecords);
        const commonFilter: FindOptionsWhere<EnrolledRecords> = {
          status: filter.status ? ILike(`%${filter.status}%`) : undefined,
          section_id: filter.section ? ILike(`%${filter.section}%`) : undefined,
          grade_level_id: filter.year_level
            ? ILike(`%${filter.year_level}%`)
            : undefined,
          SY: filter.school_year ? ILike(`%${filter.school_year}%`) : undefined,
        };

        const where = filter.search
          ? [
              {
                student: {
                  first_name: searchString,
                },
                ...commonFilter,
              },
              {
                student: {
                  middle_name: searchString,
                },
                ...commonFilter,
              },
              {
                student: {
                  last_name: searchString,
                },
                ...commonFilter,
              },
              // {
              //   increment_id: searchString,
              //   ...commonFilter,
              // },
              {
                student: {
                  email: searchString,
                },
                ...commonFilter,
              },
            ]
          : { ...commonFilter };
        const enrolledRecords = await enrolledRepo.find({
          relations: {
            student: {
              transfer_records: true,
              enrollment_records: true,
              address: true,
              parent_guardians: true,
              school_records: true,
            },
          },
          where,
          skip: offset ? offset : 0,
          take: limit ? limit : 10,
          order: {
            created_at: "DESC",
          },
        });
        const length = await enrolledRepo.count({
          where,
        });

        return { enrolledRecords, length };
      } catch (error) {
        throw new GraphQLError(error, {
          extensions: {
            code: errorType.SERVER_ERROR,
          },
        });
      }
    },
    getEnrollmentRecord: async (_, { EID }, ctx) => {
      try {
        authorized(ctx);
        const enrollmentRepo = conn.getRepository(EnrolledRecords);
        const enrollmentRecord = await enrollmentRepo.findOne({
          where: [{ id: EID }],
          relations: {
            student: {
              enrollment_records: true,
              parent_guardians: true,
              transfer_records: true,
              school_records: true,
              requirements: true,
              address: true,
            },
          },
        });
        if (!enrollmentRecord || !enrollmentRecord.student) {
          throw new GraphQLError("No student found", {
            extensions: {
              code: errorType.SERVER_ERROR,
            },
          });
        }
        return enrollmentRecord;
      } catch (error) {
        throw new GraphQLError(error, {
          extensions: {
            code: errorType.SERVER_ERROR,
          },
        });
      }
    },
    getStudentToEnrollList: async (_, { search }, ctx) => {
      try {
        authorized(ctx);
        const studentRepo = conn.getRepository(Student);
        const searchString = search ? ILike(`%${search}%`) : undefined;
        const students = await studentRepo.find({
          relations: {
            transfer_records: true,
            enrollment_records: true,
            address: true,
            parent_guardians: true,
            school_records: true,
          },
          where: [
            { first_name: searchString },
            { middle_name: searchString },
            { last_name: searchString },
            { LRN: searchString },
            { email: searchString },
          ],
          skip: 0,
          take: 12,
          order: {
            created_at: "DESC",
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
    validateStudentIDs: async (_, { LRNs }, ctx) => {
      try {
        authorized(ctx);
        const studentRepo = conn.getRepository(Student);
        if (!LRNs || LRNs.length === 0) {
          throw new GraphQLError("Query requires 1 or more ID to fetch", {
            extensions: {
              code: errorType.VALIDATION_ERROR,
            },
          });
        }
        // Fetch students with the IDS
        const students = await studentRepo.find({
          where: {
            LRN: In(LRNs),
          },
        });
        if (students.length >= 1) {
          return {
            isValid: false,
            message: `LRNs already exist`,
            LRNs: students.map(({ LRN }) => LRN),
          };
        }
        return {
          isValid: true,
          message: `Valid`,
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
  Mutation: {
    updateStudentBasicInfo: async (_, { input, ID }, ctx) => {
      try {
        const { employee_id } = authorized(ctx);
        const studentRepo = conn.getRepository(Student);
        const selectedStudent = await studentRepo.findOne({
          where: { id: ID },
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
          throw new GraphQLError("Invalid Student ID", {
            extensions: {
              code: errorType.SERVER_ERROR,
            },
          });
        }
        selectedStudent.email = input.email;
        selectedStudent.first_name = input.first_name;
        selectedStudent.last_name = input.last_name;
        selectedStudent.middle_name = input.middle_name;
        selectedStudent.birthday = input.birthday;
        selectedStudent.contact_number = input.contact_number;
        selectedStudent.LRN = input.LRN;
        const savedStudent = await studentRepo.save(selectedStudent);
        const trailMessage = `Student ${savedStudent.first_name} ${savedStudent.last_name} basic info has been modified`;
        recordTrail(employee_id, trailMessage, "MANAGE_STUDENT_INFO");
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
        const { employee_id } = authorized(ctx);
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
        const trailMessage = `Student ${savedStudent.first_name} ${savedStudent.last_name} has been added to student list`;
        recordTrail(employee_id, trailMessage, "ADDED_STUDENT");
        return savedStudent;
      } catch (error) {
        throw new GraphQLError(error, {
          extensions: {
            code: errorType.SERVER_ERROR,
          },
        });
      }
    },
    addStudents: async (_, { input }, ctx) => {
      try {
        const { employee_id } = authorized(ctx);
        const studentRepo = conn.getRepository(Student);
        await addStudentsValidationSchema.validate(input).catch((err) => {
          throw new GraphQLError(err.message, {
            extensions: {
              code: errorType.VALIDATION_ERROR,
            },
          });
        });
        if (input.length === 0) {
          throw new GraphQLError("Must have morethan 1 student to upload", {
            extensions: {
              code: errorType.VALIDATION_ERROR,
            },
          });
        }

        const newStudents: Array<Student> = input.map((studentItem) => {
          const studentData = studentItem as StudentInput;
          const { LRN, middle_name, birthday, contact_number, email, ...rest } =
            studentData;
          return {
            ...rest,
            LRN,
            middle_name: mapUndefined(middle_name),
            birthday: mapUndefined(birthday),
            contact_number: mapUndefined(contact_number),
            email: mapUndefined(email),
            address: {
              barangay: "",
              city: "",
              province: "",
              region: "",
              zip: "",
              no: "",
              subdiv: "",
              street: "",
            },
            parent_guardians: [],
            school_records: [],
            requirements: {
              has_baptismal: false,
              has_form_137: false,
              has_good_moral: false,
              has_parent_marriage_contract: false,
              has_psa: false,
              has_report_card: false,
              has_report_of_rating: false,
              has_school_government_recognition: false,
            },
          };
        });

        const savedStudent = await studentRepo.save(newStudents);
        const trailMessage = `Employee ${employee_id} has imported students data`;
        recordTrail(employee_id, trailMessage, "ADDED_STUDENT");
        return savedStudent;
      } catch (error) {
        throw new GraphQLError(error, {
          extensions: {
            code: errorType.SERVER_ERROR,
          },
        });
      }
    },
    updateStudentAddressInfo: async (_, { ID, input }, ctx) => {
      try {
        const { employee_id } = authorized(ctx);
        const studentRepo = conn.getRepository(Student);
        const selectedStudent = await studentRepo.findOne({
          where: { id: ID },
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
          throw new GraphQLError("Invalid Student ID", {
            extensions: {
              code: errorType.SERVER_ERROR,
            },
          });
        }
        const { barangay, city, province, region, zip, no, street, subdiv } =
          input;

        // Check if have address
        if (selectedStudent.address) {
          selectedStudent.address.barangay = barangay;
          selectedStudent.address.city = city;
          selectedStudent.address.province = province;
          selectedStudent.address.region = region;
          selectedStudent.address.zip = zip;
          selectedStudent.address.no = no ? no : "";
          selectedStudent.address.street = street ? street : "";
          selectedStudent.address.subdiv = subdiv ? subdiv : "";
        } else {
          const newAddress: StudentAddress = {
            barangay,
            city,
            province,
            region,
            zip,
            no: no ? no : "",
            street: street ? street : "",
            subdiv: subdiv ? subdiv : "",
          };
          selectedStudent.address = newAddress;
        }
        const savedStudent = await studentRepo.save(selectedStudent);
        const trailMessage = `Student ${savedStudent.first_name} ${savedStudent.last_name} address info has been modified`;
        recordTrail(employee_id, trailMessage, "ADDED_STUDENT");
        return savedStudent;
      } catch (error) {
        throw new GraphQLError(error, {
          extensions: {
            code: errorType.SERVER_ERROR,
          },
        });
      }
    },
    updateStudentParentInfo: async (_, { ID, input }, ctx) => {
      try {
        const { employee_id } = authorized(ctx);
        const studentRepo = conn.getRepository(Student);
        const parentGuardianRepo = conn.getRepository(StudentParentGuardian);
        const selectedStudent = await studentRepo.findOne({
          where: { id: ID },
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
          throw new GraphQLError("Invalid Student ID", {
            extensions: {
              code: errorType.SERVER_ERROR,
            },
          });
        }
        const { father, guardian, mother } = input;
        // Check father info
        if (father) {
          if (father?.id) {
            const selectedFatherAccount = await parentGuardianRepo.findOne({
              where: {
                id: father?.id,
              },
            });
            if (selectedFatherAccount) {
              selectedFatherAccount.contact_number = father.contact_number
                ? father.contact_number
                : "";
              selectedFatherAccount.first_name = father?.first_name
                ? father?.first_name
                : "";
              selectedFatherAccount.middle_name = father?.middle_name
                ? father?.middle_name
                : "";
              selectedFatherAccount.last_name = father?.last_name
                ? father?.last_name
                : "";
              selectedFatherAccount.email = father?.email ? father?.email : "";
              await parentGuardianRepo.save(selectedFatherAccount);
            }
          } else {
            console.log("else");
            const newAccount: StudentParentGuardian = {
              contact_number: father?.contact_number
                ? father?.contact_number
                : "",
              first_name: father?.first_name ? father?.first_name : "",
              middle_name: father?.middle_name ? father?.middle_name : "",
              last_name: father?.last_name ? father?.last_name : "",
              email: father?.email ? father?.email : "",
              type: "F",
              student: selectedStudent,
            };
            // Insert
            await parentGuardianRepo.save(newAccount);
          }
        }

        // Check mother info
        if (mother) {
          if (mother?.id) {
            const selectedMotherAccount = await parentGuardianRepo.findOne({
              where: {
                id: mother?.id,
              },
            });
            if (selectedMotherAccount) {
              selectedMotherAccount.contact_number = mother?.contact_number
                ? mother?.contact_number
                : "";
              selectedMotherAccount.first_name = mother?.first_name
                ? mother?.first_name
                : "";
              selectedMotherAccount.middle_name = mother?.middle_name
                ? mother?.middle_name
                : "";
              selectedMotherAccount.last_name = mother?.last_name
                ? mother?.last_name
                : "";
              selectedMotherAccount.email = mother?.email ? mother?.email : "";
              await parentGuardianRepo.save(selectedMotherAccount);
            }
          } else {
            const newAccount: StudentParentGuardian = {
              contact_number: mother?.contact_number
                ? mother?.contact_number
                : "",
              first_name: mother?.first_name ? mother?.first_name : "",
              middle_name: mother?.middle_name ? mother?.middle_name : "",
              last_name: mother?.last_name ? mother?.last_name : "",
              email: mother?.email ? mother?.email : "",
              type: "M",
              student: selectedStudent,
            };
            await parentGuardianRepo.save(newAccount);
          }
        }

        // Check guardian info
        if (guardian) {
          if (guardian?.id) {
            const selectedGuardianAccount = await parentGuardianRepo.findOne({
              where: {
                id: guardian?.id,
              },
            });
            if (selectedGuardianAccount) {
              selectedGuardianAccount.contact_number = guardian?.contact_number
                ? guardian?.contact_number
                : "";
              selectedGuardianAccount.first_name = guardian?.first_name
                ? guardian?.first_name
                : "";
              selectedGuardianAccount.middle_name = guardian?.middle_name
                ? guardian?.middle_name
                : "";
              selectedGuardianAccount.last_name = guardian?.last_name
                ? guardian?.last_name
                : "";
              selectedGuardianAccount.email = guardian?.email
                ? guardian?.email
                : "";
              await parentGuardianRepo.save(selectedGuardianAccount);
            }
          } else {
            const newAccount: StudentParentGuardian = {
              contact_number: guardian?.contact_number
                ? guardian?.contact_number
                : "",
              first_name: guardian?.first_name ? guardian?.first_name : "",
              middle_name: guardian?.middle_name ? guardian?.middle_name : "",
              last_name: guardian?.last_name ? guardian?.last_name : "",
              email: guardian?.email ? guardian?.email : "",
              type: "G",
              // student: selectedStudent,
            };
            await parentGuardianRepo.save(newAccount);
          }
        }

        const reselectStudent = await studentRepo.findOne({
          where: { id: ID },
          relations: {
            enrollment_records: true,
            parent_guardians: true,
            transfer_records: true,
            school_records: true,
            requirements: true,
            address: true,
          },
        });
        const savedStudent = await studentRepo.save(selectedStudent);
        const trailMessage = `Student ${savedStudent.first_name} ${savedStudent.last_name} parent/guardian info has been modified`;
        recordTrail(employee_id, trailMessage, "MANAGE_STUDENT_INFO");

        return reselectStudent;
      } catch (error) {
        throw new GraphQLError(error, {
          extensions: {
            code: errorType.SERVER_ERROR,
          },
        });
      }
    },
    updateStudentRequirementInfo: async (_, { ID, input }, ctx) => {
      try {
        const { employee_id } = authorized(ctx);
        const studentRepo = conn.getRepository(Student);
        const selectedStudent = await studentRepo.findOne({
          where: { id: ID },
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
          throw new GraphQLError("Invalid Student ID", {
            extensions: {
              code: errorType.SERVER_ERROR,
            },
          });
        }
        const {
          has_baptismal,
          has_form_137,
          has_good_moral,
          has_parent_marriage_contract,
          has_psa,
          has_report_card,
          has_report_of_rating,
          has_school_government_recognition,
        } = input;

        // Check if have address
        if (selectedStudent.requirements) {
          selectedStudent.requirements.has_baptismal = has_baptismal;
          selectedStudent.requirements.has_form_137 = has_form_137;
          selectedStudent.requirements.has_good_moral = has_good_moral;
          selectedStudent.requirements.has_parent_marriage_contract =
            has_parent_marriage_contract;
          selectedStudent.requirements.has_psa = has_psa;
          selectedStudent.requirements.has_report_card = has_report_card;
          selectedStudent.requirements.has_report_of_rating =
            has_report_of_rating;
          selectedStudent.requirements.has_school_government_recognition =
            has_school_government_recognition;
        } else {
          const newRequirements: StudentRequirements = {
            ...input,
          };
          selectedStudent.requirements = newRequirements;
        }
        const savedStudent = await studentRepo.save(selectedStudent);
        const trailMessage = `Student ${savedStudent.first_name} ${savedStudent.last_name} requirement info has been modified`;
        recordTrail(employee_id, trailMessage, "MANAGE_STUDENT_INFO");
        return savedStudent;
      } catch (error) {
        throw new GraphQLError(error, {
          extensions: {
            code: errorType.SERVER_ERROR,
          },
        });
      }
    },
    updateStudentAcademicRecords: async (_, { ID, input }, ctx) => {
      try {
        const { employee_id } = authorized(ctx);
        const studentRepo = conn.getRepository(Student);
        const studentAcademicRecord = conn.getRepository(StudentSchoolRecord);
        const selectedStudent = await studentRepo.findOne({
          where: { id: ID },
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
          throw new GraphQLError("Invalid Student ID", {
            extensions: {
              code: errorType.SERVER_ERROR,
            },
          });
        }

        input.map(async (val) => {
          // Check if ID is existing
          if (val) {
            if (val.id) {
              // Old records, update it
              const record = await studentAcademicRecord.findOne({
                where: { id: val.id },
              });

              if (record && val.is_active) {
                record.school_name = val.school_name;
                record.sy_graduated = val.sy_graduated;
                record.type = val.type;
                await studentAcademicRecord.save(record);
              } else {
                await studentAcademicRecord.delete({ id: val.id });
              }
            } else {
              // crate new record
              await studentAcademicRecord.save({
                student: selectedStudent,
                sy_graduated: val.sy_graduated,
                school_name: val.school_name,
                type: val.type,
              });
            }
          }
        });
        const reselectStudent = await studentRepo.findOne({
          where: { id: ID },
          relations: {
            enrollment_records: true,
            parent_guardians: true,
            transfer_records: true,
            school_records: true,
            requirements: true,
            address: true,
          },
        });
        const trailMessage = `Student ${reselectStudent?.first_name} ${reselectStudent?.last_name} academic record has been modified`;
        recordTrail(employee_id, trailMessage, "MANAGE_STUDENT_INFO");

        return reselectStudent;
      } catch (error) {
        throw new GraphQLError(error, {
          extensions: {
            code: errorType.SERVER_ERROR,
          },
        });
      }
    },
    dropEnrollmentRecord: async (_, { input }, ctx) => {
      try {
        const { employee_id } = authorized(ctx);
        if (!input || input === null || input.length === 0) {
          throw new GraphQLError("Invalid Student ID", {
            extensions: {
              code: errorType.SERVER_ERROR,
            },
          });
        }
        const enrollmentRecordRepo = conn.getRepository(EnrolledRecords);
        const records = await enrollmentRecordRepo.find({
          relations: {
            student: {
              enrollment_records: true,
              parent_guardians: true,
              transfer_records: true,
              school_records: true,
              requirements: true,
              address: true,
            },
          },
          where: { id: In([...input]) },
        });

        const refactorRecords = records.map(({ status, ...rest }) => ({
          ...rest,
          status: "d",
        }));
        const savedRecords = await enrollmentRecordRepo.save(refactorRecords);
        const trailMessage = `Set of students has been dropped`;
        recordTrail(employee_id, trailMessage, "MANAGE_STUDENT_INFO");
        return savedRecords;
      } catch (error) {
        throw new GraphQLError(error, {
          extensions: {
            code: errorType.SERVER_ERROR,
          },
        });
      }
    },
    updateStudentEnrollmentInfo: async (_, { EID, input }, ctx) => {
      try {
        const { employee_id } = authorized(ctx);
        const enrollmentRecordRepo = conn.getRepository(EnrolledRecords);
        const enrollmentRecord = await enrollmentRecordRepo.findOne({
          where: {
            id: EID,
          },
          relations: {
            student: {
              enrollment_records: true,
              parent_guardians: true,
              transfer_records: true,
              school_records: true,
              requirements: true,
              address: true,
            },
          },
        });
        if (!enrollmentRecord) {
          throw new GraphQLError("Invalid Student ID", {
            extensions: {
              code: errorType.SERVER_ERROR,
            },
          });
        }

        enrollmentRecord.section_id = input.section_id;
        enrollmentRecord.status = input.status;
        const savedRecord = await enrollmentRecordRepo.save(enrollmentRecord);
        const trailMessage = `Student ${savedRecord.student?.first_name} ${savedRecord.student?.last_name} enrollment record has been modified`;
        recordTrail(employee_id, trailMessage, "MANAGE_STUDENT_INFO");
        return savedRecord;
      } catch (error) {
        throw new GraphQLError(error, {
          extensions: {
            code: errorType.SERVER_ERROR,
          },
        });
      }
    },
    enrollStudent: async (_, { input }, ctx) => {
      try {
        const { employee_id } = authorized(ctx);
        const enrollmentRecordRepo = conn.getRepository(EnrolledRecords);
        const studentRepo = conn.getRepository(Student);

        const student = await studentRepo
          .findOneOrFail({
            where: {
              id: input.id,
            },
          })
          .catch(() => {
            throw new GraphQLError("Invalid Student ID", {
              extensions: {
                code: errorType.SERVER_ERROR,
              },
            });
          });

        const SY = await getSchoolYear();
        console.log(`SY`, SY);
        await enrollmentRecordRepo.save({
          section_id: input.section,
          grade_level_id: input.year_level,
          student,
          SY,
        });

        const reselectStudent = await studentRepo
          .findOneOrFail({
            where: {
              id: input.id,
            },
            relations: {
              enrollment_records: true,
              parent_guardians: true,
              transfer_records: true,
              school_records: true,
              requirements: true,
              address: true,
            },
          })
          .catch(() => {
            throw new GraphQLError("Invalid Student ID", {
              extensions: {
                code: errorType.SERVER_ERROR,
              },
            });
          });

        const trailMessage = `Student ${reselectStudent?.first_name} ${reselectStudent?.last_name} enrollment record has been created`;
        recordTrail(employee_id, trailMessage, "ENROLL_STUDENT");
        return reselectStudent;
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
