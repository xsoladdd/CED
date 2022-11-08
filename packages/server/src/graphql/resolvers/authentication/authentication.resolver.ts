import { Arg, Authorized, Ctx, Query, Resolver } from "type-graphql";
import { Employee } from "../../../models/Employee/Employee";
import { Icontext } from "../../../types";
import { employee_detail } from "./employee_detail/employee_detail";
import { employee_auth } from "./emplyee_auth";
import { LoginReturn, LoginInput } from "./emplyee_auth/Helper";
@Resolver()
export class AuthenticationResolver {
  @Query(() => LoginReturn)
  async employee_auth(@Arg("input") input: LoginInput): Promise<LoginReturn> {
    return await employee_auth(input);
  }

  @Authorized()
  @Query(() => Employee)
  async employee_detail(@Ctx() ctx: Icontext): Promise<Employee> {
    const x = await employee_detail(ctx);
    console.log(x);
    return x;
  }
}
