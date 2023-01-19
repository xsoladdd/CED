import { Employee } from "../../../../graphQL/generated/graphql";

export interface IuserSlice {
  user: {
    data: Employee;
    setData: (userData: Employee) => void;
    nullifyPartialPassword: () => void;
  };
}
