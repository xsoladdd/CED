import { GraphQLError } from "graphql";
import { conn } from "../config/db";
import { AuditTrail } from "../models/Employee/AuditTrail";
import { Employee } from "../models/Employee/Employee";
import { errorType } from "./errorType";
import { formatDate } from "./formatDate";

export const recordTrailType = {
  ADD_EMPLOYEE: "ADD_EMPLOYEE",
  EDIT_EMPLOYEE: "EDIT_EMPLOYEE",
  RESET_EMPLOYEE_PASSWORD: "RESET_EMPLOYEE_PASSWORD",
  DISABLE_EMPLOYEE_ACCOUNT: "DISABLE_EMPLOYEE_ACCOUNT",
  LOGIN: "LOGIN",
  OTHER: "OTHER",
};

type TrecordTrail = keyof typeof recordTrailType;

const generateDescription = (
  type: TrecordTrail,
  employee: Employee
): string => {
  switch (type) {
    case "ADD_EMPLOYEE":
      return `${employee?.profile?.first_name} ${employee?.profile?.last_name} added a new user`;

    case "DISABLE_EMPLOYEE_ACCOUNT":
      return ``;

    case "LOGIN":
      return `${employee?.profile?.first_name} ${employee?.profile?.last_name} - ${employee.employee_id} logged in to the system`;

    case "EDIT_EMPLOYEE":
      return ``;

    case "RESET_EMPLOYEE_PASSWORD":
      return ``;

    default:
      return `Did something to the system`;
  }
};

export const recordTrail = async (
  employee_id: string,
  type: TrecordTrail = "OTHER"
) => {
  try {
    const auditTrailRepo = conn.getRepository(AuditTrail);
    const employeeRepo = conn.getRepository(Employee);
    const employee = await employeeRepo.findOne({
      where: { employee_id },
      relations: { profile: true },
    });
    if (employee) {
      const description = generateDescription(type, employee);
      const trail: AuditTrail = {
        action_type: type,
        employee,
        description,
        timestamp: formatDate(new Date()),
      };
      await auditTrailRepo.save(trail);
    }
  } catch (error) {
    throw new GraphQLError(error, {
      extensions: {
        code: errorType.SERVER_ERROR,
      },
    });
  }
};
