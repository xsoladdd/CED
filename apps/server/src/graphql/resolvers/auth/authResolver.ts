import { hash, verify } from "argon2";
import { GraphQLError } from "graphql";
import { conn } from "../../../config/db";
import { Employee } from "../../../models/Employee/Employee";
import { authorized } from "../../../utils/authorized";
import { errorType } from "../../../utils/errorType";
import JWT from "../../../utils/JWT";
import { recordTrail } from "../../../utils/recordTrail";
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
          where: { employee_id: EID },
          relations: {
            profile: true,
          },
        });
        if (!user) {
          throw new GraphQLError("Incorrect employee ID or password", {
            extensions: {
              code: errorType.AUTHENTICATION_ERROR,
            },
          });
        }
        if (user.status === 0) {
          throw new GraphQLError("Account is suspended", {
            extensions: {
              code: errorType.AUTHENTICATION_ERROR,
            },
          });
        }
        if (!(await verify(user.password, password))) {
          throw new GraphQLError("Incorrect employee ID or password", {
            extensions: {
              code: errorType.AUTHENTICATION_ERROR,
            },
          });
        }
        const trailMessage = `${user.profile?.first_name} ${user.profile?.middle_name} ${user.profile?.last_name} has logged in`;
        await recordTrail(user.employee_id, trailMessage, "LOGIN");
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
        const { employee_id } = await authorized(ctx);
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
        if (newEmployee?.id) {
          const trailMessage = `Employee ${newEmployee.profile?.first_name} ${newEmployee.profile?.last_name} has change password`;
          recordTrail(newEmployee.id, trailMessage, "OTHER");
        }
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
        const { employee_id } = await authorized(ctx);
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
