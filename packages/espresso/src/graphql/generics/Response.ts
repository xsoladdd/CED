import { ObjectType, Field, Int } from "type-graphql";

@ObjectType()
class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}

@ObjectType()
export class ReturnStructure {
  @Field(() => Int, { defaultValue: 0 })
  status?: number;

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}
