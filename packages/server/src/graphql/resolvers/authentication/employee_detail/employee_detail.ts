import { GraphQLError } from "graphql";
import { conn } from "../../../../config/db";
import { Employee } from "../../../../models/Employee/Employee";
import { Icontext } from "../../../../types";
import { errorType } from "../../../../utils/errorType";

export const employee_detail = async (context: Icontext): Promise<Employee> => {
  try {
    const { id } = context;
    const employeeRepo = conn.getRepository(Employee);
    const user = await employeeRepo.findOne({
      where: { id: id, status: 1 },
      relations: { profile: true },
    });
    if (!user) {
      throw new GraphQLError("No user found", {
        extensions: {
          code: errorType.VALIDATION_ERROR,
        },
      });
    }
    return user;
  } catch (error) {
    throw new GraphQLError(error, {
      extensions: {
        code: errorType.SERVER_ERROR,
      },
    });
  }
};
