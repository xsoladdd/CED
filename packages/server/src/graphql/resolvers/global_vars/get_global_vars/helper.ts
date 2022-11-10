import { Field, ObjectType } from "type-graphql";
import { GlobalVars } from "../../../../models/GlobalVars";

@ObjectType()
export class GlobalVarsReturn {
  @Field(() => GlobalVars)
  school_year: GlobalVars;
}
