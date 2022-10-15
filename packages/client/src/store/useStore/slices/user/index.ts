interface IuserSlice {
  user: {
    data: IUserData;
    setData: (userData: IUserData) => void;
    isNewUser: boolean;
    setNewUserModalStatus: (toggle: boolean) => void;
  };
}

export const userSlice: StoreSlice<IuserSlice> = (set) => ({
  user: {
    isNewUser: false,
    setNewUserModalStatus: (toggle) =>
      set(
        ({ user }: IuserSlice): IuserSlice => ({
          user: {
            ...user,
            isNewUser: toggle,
          },
        })
      ),
    data: {},
    setData: (userData) =>
      set(({ user }: IuserSlice): IuserSlice => {
        console.log(user);
        return {
          user: {
            ...user,
            isNewUser: !!userData.profile,
            data: { ...userData },
          },
        };
      }),
  },
});
