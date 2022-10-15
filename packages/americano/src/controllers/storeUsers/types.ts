export interface IAuthForm {
  email: string;
  password: string;
}

export interface INewStoreAndProfileForm {
  firstName: string;
  middleName?: string;
  lastName: string;
  mobileNumber: string;
  landlineNumber?: string;
  address: string;
  storeName: string;
  description?: string;
}
