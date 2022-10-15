import { number, object, string } from "yup";

export const catSchema = object({
  firstname: string().min(4).max(10).required(),
  lastname: string().min(4).max(10).required(),
  age: number().required(),
});

export const idSchema = object({
  id: string().uuid().required(),
});
