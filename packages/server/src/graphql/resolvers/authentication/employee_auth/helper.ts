import { Field, InputType, ObjectType } from "type-graphql";
import * as yup from "yup";

@InputType()
export class LoginInput {
  @Field()
  EID: string;

  @Field()
  password: string;
}

@ObjectType()
export class LoginReturn {
  @Field()
  token: string;
}

export const loginInputSchema = yup.object().shape({
  EID: yup.string().min(8).required("required"),
  password: yup.string().min(8).required("required"),
});
