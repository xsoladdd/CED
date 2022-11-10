import { verify } from "argon2";
import { GraphQLError } from "graphql";
import { conn } from "../../../../config/db";
import { Employee } from "../../../../models/Employee/Employee";
import { errorType } from "../../../../utils/errorType";
import JWT from "../../../../utils/JWT";
import { LoginInput, loginInputSchema, LoginReturn } from "./Helper";

export const employee_auth = async (
  input: LoginInput
): Promise<LoginReturn> => {
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
    };
  } catch (error) {
    throw new GraphQLError(error, {
      extensions: {
        code: errorType.SERVER_ERROR,
      },
    });
  }
};
