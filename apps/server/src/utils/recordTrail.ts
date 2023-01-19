import { GraphQLError } from "graphql";
import { conn } from "../config/db";
import { AuditTrail } from "../models/Employee/AuditTrail";
import { Employee } from "../models/Employee/Employee";
import { errorType } from "./errorType";

export const recordTrailType = {
  ADD_EMPLOYEE: "ADD_EMPLOYEE",
  EDIT_EMPLOYEE: "EDIT_EMPLOYEE",
  RESET_EMPLOYEE_PASSWORD: "RESET_EMPLOYEE_PASSWORD",
  DISABLE_EMPLOYEE_ACCOUNT: "DISABLE_EMPLOYEE_ACCOUNT",
  LOGIN: "LOGIN",
  OTHER: "OTHER",
  MANAGE_STUDENT_INFO: "MANAGE_STUDENT_INFO",
  ADDED_STUDENT: "ADDED_STUDENT",
  ENROLL_STUDENT: "ENROLL_STUDENT",
  LOGOUT: "LOGOUT",
};

type TrecordTrail = keyof typeof recordTrailType;

export const recordTrail = async (
  employee_id: string,
  message: string,
  type: TrecordTrail = "OTHER"
): Promise<void> => {
  try {
    const auditTrailRepo = conn.getRepository(AuditTrail);
    const employeeRepo = conn.getRepository(Employee);
    const employee = await employeeRepo.findOne({
      where: { employee_id },
      relations: { profile: true },
    });
    if (employee) {
      const trail: AuditTrail = {
        action_type: type,
        employee,
        description: message,
        timestamp: new Date().toString(),
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
