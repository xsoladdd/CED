import { hash } from "argon2";
import { GraphQLError } from "graphql";
import { Like, Not } from "typeorm";
import { conn } from "../../../config/db";
import { AuditTrail } from "../../../models/Employee/AuditTrail";
import { Employee } from "../../../models/Employee/Employee";
import { authorized } from "../../../utils/authorized";
import { errorType } from "../../../utils/errorType";
import { Resolvers } from "../../generated";
import { addEmployeeSchema } from "./helper";

export const employeeResolver: Resolvers = {
  Query: {
    getEmployees: async (_, { limit, offset, search, filter }, ctx) => {
      try {
        authorized(ctx);
        const employeeRepo = conn.getRepository(Employee);
        const employees = await employeeRepo.find({
          where: {
            status:
              typeof filter?.status === "undefined"
                ? undefined
                : (filter?.status as number),
            employee_id: search ? Like(`%${search}%`) : undefined,
            role: Not("BA"),
          },
          relations: { audit: true, profile: true },
          skip: offset ? offset : 0,
          take: limit ? limit : 10,
          order: {
            created_at: "ASC",
          },
        });
        return employees;
      } catch (error) {
        throw new GraphQLError(error, {
          extensions: {
            code: errorType.SERVER_ERROR,
          },
        });
      }
    },
    getEmployee: async (_, { employee_id }, ctx) => {
      try {
        authorized(ctx);
        const employeeRepo = conn.getRepository(Employee);
        const employees = await employeeRepo.findOne({
          where: {
            employee_id,
            // status: 1,
            role: Not("BA"),
          },
          relations: { audit: true, profile: true },
        });
        return employees;
      } catch (error) {
        throw new GraphQLError(error, {
          extensions: {
            code: errorType.SERVER_ERROR,
          },
        });
      }
    },
    getAuditTrails: async (_, { limit, offset, search, filter }, ctx) => {
      try {
        authorized(ctx);
        const auditTrailRepo = conn.getRepository(AuditTrail);
        const searchString =
          search || search !== "" ? Like(`%${search}%`) : undefined;
        const auditTrails = await auditTrailRepo.find({
          where: {
            action_type:
              typeof filter?.type === "undefined" || filter?.type === ""
                ? undefined
                : (filter?.type as string),
            employee: {
              employee_id: searchString,
              // profile: {
              //   first_name: searchString,
              //   last_name: searchString,
              // },
            },
          },
          relations: { employee: { profile: true } },
          skip: offset ? offset : 0,
          take: limit ? limit : 10,
        });
        return auditTrails;
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
    addEmployee: async (_, { input }, ctx) => {
      try {
        authorized(ctx);
        const { employee } = input;
        await addEmployeeSchema.validate(employee).catch((err) => {
          throw new GraphQLError(err.message, {
            extensions: {
              code: errorType.VALIDATION_ERROR,
            },
          });
        });
        const employeeRepo = conn.getRepository(Employee);

        // Check if employee_id exist
        const checkEID = await employeeRepo.findOne({
          where: {
            employee_id: employee.employee_id,
            // status: 1,
          },
        });
        if (checkEID) {
          throw new GraphQLError("Employee ID already exist", {
            extensions: {
              code: errorType.VALIDATION_ERROR,
            },
          });
        }

        const { employee_id, role, password, profile } = employee;
        const hashedPassword = await hash(password);
        const newEmployeeProfile = profile
          ? {
              first_name: profile.first_name,
              last_name: profile.last_name,
              middle_name: profile.middle_name ? profile.middle_name : "",
            }
          : undefined;
        const newEmployee: Employee = {
          employee_id,
          partial_password: password,
          password: hashedPassword,
          role,
          profile: newEmployeeProfile,
        };
        const savedEmployee = await employeeRepo.save(newEmployee);
        return savedEmployee;
      } catch (error) {
        throw new GraphQLError(error, {
          extensions: {
            code: errorType.SERVER_ERROR,
          },
        });
      }
    },
    disableEmployee: async (_, { employee_id }, ctx) => {
      try {
        authorized(ctx);
        const employeeRepo = conn.getRepository(Employee);
        const selectedEmployee = await employeeRepo.findOne({
          where: {
            employee_id: employee_id,
            status: 1,
          },
        });
        if (!selectedEmployee) {
          throw new GraphQLError("No employee found. Invalid employee_id", {
            extensions: {
              code: errorType.SERVER_ERROR,
            },
          });
        }

        selectedEmployee.status = 0;
        await employeeRepo.save(selectedEmployee);
        return "Succesfully disabled account";
      } catch (error) {
        throw new GraphQLError(error, {
          extensions: {
            code: errorType.SERVER_ERROR,
          },
        });
      }
    },
    enableEmployee: async (_, { employee_id }, ctx) => {
      try {
        authorized(ctx);
        const employeeRepo = conn.getRepository(Employee);
        const selectedEmployee = await employeeRepo.findOne({
          where: {
            employee_id: employee_id,
            status: 0,
          },
        });
        if (!selectedEmployee) {
          throw new GraphQLError("No employee found. Invalid employee_id", {
            extensions: {
              code: errorType.SERVER_ERROR,
            },
          });
        }

        selectedEmployee.status = 1;
        await employeeRepo.save(selectedEmployee);
        return "Succesfully enabled account";
      } catch (error) {
        throw new GraphQLError(error, {
          extensions: {
            code: errorType.SERVER_ERROR,
          },
        });
      }
    },
    resetEmployeePassword: async (_, { employee_id, password }, ctx) => {
      try {
        authorized(ctx);
        const employeeRepo = conn.getRepository(Employee);
        // Check if employee_id exist
        const selectedEmployee = await employeeRepo.findOne({
          where: {
            employee_id: employee_id,
            status: 1,
          },
        });
        if (!selectedEmployee) {
          throw new GraphQLError("No employee found. Invalid employee_id", {
            extensions: {
              code: errorType.SERVER_ERROR,
            },
          });
        }
        const hashedPassword = await hash(password);
        selectedEmployee.password = hashedPassword;
        selectedEmployee.partial_password = password;
        const newEmployee = await employeeRepo.save(selectedEmployee);
        return newEmployee;
      } catch (error) {
        throw new GraphQLError(error, {
          extensions: {
            code: errorType.SERVER_ERROR,
          },
        });
      }
    },
    changeEmployeePassword: async (_, { employee_id, password }, ctx) => {
      try {
        authorized(ctx);
        const employeeRepo = conn.getRepository(Employee);
        // Check if employee_id exist
        const selectedEmployee = await employeeRepo.findOne({
          where: {
            employee_id: employee_id,
            status: 1,
          },
        });
        if (!selectedEmployee) {
          throw new GraphQLError("No employee found. Invalid employee_id", {
            extensions: {
              code: errorType.SERVER_ERROR,
            },
          });
        }
        const hashedPassword = await hash(password);
        selectedEmployee.password = hashedPassword;
        selectedEmployee.partial_password = "";
        const newEmployee = await employeeRepo.save(selectedEmployee);
        return newEmployee;
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
