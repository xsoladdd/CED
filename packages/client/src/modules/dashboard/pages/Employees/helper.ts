import { Iroles } from "../../../../store/useStore/slices/global/types";

export const column = [
  "Employee #",
  "Full Name",
  "Partial Password",
  "Role",
  "Status",
  "Actions",
];

export const generateRoleTitle = (
  role: "SA" | "RT" | "BD",
  roles: Iroles[]
): string => {
  const roleInfo = roles.filter(({ value }) => value === role)[0];
  return roleInfo?.title;
};
