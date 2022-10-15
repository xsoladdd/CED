import { Authorized, Query, Resolver } from "type-graphql";

@Resolver()
export class dummyResolver {
  @Authorized()
  @Query(() => String)
  ping(): String {
    return "pong";
  }
}
