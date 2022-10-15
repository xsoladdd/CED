import * as Yup from 'yup';

export const loginShema = Yup.object().shape({
  email: Yup.string()
    .min(10, `Too Short!`)
    .max(30, `Too Long!`)
    .email(`Invalid email`)
    .required(`Email is required`),
  password: Yup.string()
    .min(8, `Too Short!`)
    .max(20, `Too Long!`)
    .required(`Password is required`),
});
