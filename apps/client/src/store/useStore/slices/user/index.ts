import { IuserSlice } from "./types";

export const userSlice: StoreSlice<IuserSlice> = (set) => ({
  user: {
    data: {
      employee_id: "",
      profile: undefined,
      role: "",
      id: "",
    },
    setData: (userData) =>
      set(({ user }: IuserSlice): IuserSlice => {
        return {
          user: {
            ...user,
            data: userData,
          },
        };
      }),
    nullifyPartialPassword: () =>
      set(({ user }: IuserSlice): IuserSlice => {
        return {
          user: {
            ...user,
            data: {
              ...user.data,
              partial_password: null,
            },
          },
        };
      }),
  },
});
