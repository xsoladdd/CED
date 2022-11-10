import { Authorized, Query, Resolver } from "type-graphql";
import { get_global_vars } from "./get_global_vars/get_global_vars";
import { GlobalVarsReturn } from "./get_global_vars/helper";
@Resolver()
export class GlobalVarsResolver {
  @Authorized()
  @Query(() => GlobalVarsReturn)
  async get_globa_vars(): Promise<GlobalVarsReturn> {
    // const x = await employee_detail(ctx);
    // console.log(x);
    // return;
    return await get_global_vars();
  }
}
