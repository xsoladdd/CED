type StoreSlice<T extends object, E extends object = T> = (
  set: SetState<E extends T ? E : E & T>,
  get: GetState<E extends T ? E : E & T>
) => T;

interface IUserData {
  deletedDate?: any;
  id?: string;
  email?: string;
  is_active?: boolean;
  is_first_time_loggedin?: boolean;
  profile?: any;
}

interface IAuthServerRes<T> {
  status: 1 | 0;
  data: T;
}
