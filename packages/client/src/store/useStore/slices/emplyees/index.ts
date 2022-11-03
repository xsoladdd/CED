import { initialState } from "./initialState";
import { IemployeeSlice } from "./types";

export const employeeSlice: StoreSlice<IemployeeSlice> = () => ({
  employee: {
    employeeList: [...initialState.employeeList],
  },
});
