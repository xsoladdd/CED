import { InputType, Field, Int } from "type-graphql";

@InputType()
export class DefaultListInput {
  @Field(() => Int, { defaultValue: 10 })
  limit?: number;

  @Field(() => Int, { defaultValue: 0 })
  offset?: number;

  @Field(() => String, { defaultValue: "" })
  search?: string;
}
