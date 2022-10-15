import { object, string } from "yup";

export const authFormValidation = object({
  email: string().email().min(8).required(),
  password: string().min(8).required(),
});

export const newStoreAndProfileValidation = object({
  firstName: string().min(4).max(15).required(),
  lastName: string().min(2).max(15).required(),
  storeName: string().min(2).max(15).required(),
  mobileNumber: string()
    .matches(/^(09|\+639)\d{9}$/, {
      message: "Invalid mobile number",
      excludeEmptyString: false,
    })
    .min(11)
    .max(13)
    .required(),
  address: string().min(10).max(50).required(),
});
