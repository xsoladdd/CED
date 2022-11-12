import { hash, verify } from "argon2";
import { GraphQLError } from "graphql";
import { conn } from "../../../config/db";
import { Employee } from "../../../models/Employee/Employee";
import { authorized } from "../../../utils/authorized";
import { errorType } from "../../../utils/errorType";
import JWT from "../../../utils/JWT";
import { Resolvers } from "../../generated";
import { loginInputSchema } from "./helper";

export const authResolver: Resolvers = {
  Mutation: {
    auth: async (_, { input }) => {
      try {
        await loginInputSchema.validate(input).catch((err) => {
          throw new GraphQLError(err.message, {
            extensions: {
              code: errorType.VALIDATION_ERROR,
            },
          });
        });
        const { EID, password } = input;
        const employeeRepo = conn.getRepository(Employee);
        const user = await employeeRepo.findOne({
          where: { employee_id: EID, status: 1 },
        });
        if (!user) {
          throw new GraphQLError("Invalid employee ID", {
            extensions: {
              code: errorType.VALIDATION_ERROR,
            },
          });
        }
        if (!(await verify(user.password, password))) {
          throw new GraphQLError("Incorrect password", {
            extensions: {
              code: errorType.VALIDATION_ERROR,
            },
          });
        }
        const token = JWT.generateJWT(user);
        return {
          token,
          needNewPassword: !!user.partial_password,
        };
      } catch (error) {
        throw new GraphQLError(error, {
          extensions: {
            code: errorType.SERVER_ERROR,
          },
        });
      }
    },
    changeMyPassword: async (_, { password }, ctx) => {
      try {
        const { employee_id } = authorized(ctx);
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
  Query: {
    getMe: async (_, __, ctx) => {
      try {
        const { employee_id } = authorized(ctx);
        const employeeRepo = conn.getRepository(Employee);
        return await employeeRepo.findOne({
          where: {
            employee_id: employee_id,
            status: 1,
          },
          relations: {
            profile: true,
          },
        });
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
