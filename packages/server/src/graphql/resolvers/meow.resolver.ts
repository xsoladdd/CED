import { Authorized, Ctx, Query, Resolver } from "type-graphql";
import { Icontext } from "../../types";

@Resolver()
export class CatResolver {
  @Authorized()
  @Query(() => String)
  meow(@Ctx() ctx: Icontext) {
    console.log(ctx);
    return "meow";
  }

  @Authorized()
  @Query(() => String)
  meow_but_need_token(@Ctx() ctx: Icontext) {
    console.log(ctx);
    return "meow";
  }
}
