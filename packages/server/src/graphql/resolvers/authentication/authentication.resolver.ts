import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Employee } from "../../../models/Employee/Employee";
import { Icontext } from "../../../types";
import { employee_detail } from "./employee_detail";
import { employee_auth } from "./employee_auth";
import { LoginInput, LoginReturn } from "./employee_auth/helper";
@Resolver()
export class AuthenticationResolver {
  @Authorized()
  @Query(() => Employee)
  async employee_detail(@Ctx() ctx: Icontext): Promise<Employee> {
    return await employee_detail(ctx);
  }

  @Mutation(() => LoginReturn)
  async employee_auth(@Arg("input") input: LoginInput): Promise<LoginReturn> {
    return await employee_auth(input);
  }
}
