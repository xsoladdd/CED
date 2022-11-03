export interface IemployeeData {
  id?: string;
  EID: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  role: "RT" | "BD" | "SA";
  status: boolean;
  partial_password?: string;
}
export interface IemployeeSlice {
  employee: {
    employeeList: Array<IemployeeData>;
  };
}
