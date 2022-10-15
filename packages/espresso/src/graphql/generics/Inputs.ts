import { Field, InputType, Int } from "type-graphql";
import { EncryptedID } from "../scalars/EncryptedID";

@InputType()
export class InputStructure {
  @Field(() => Int, { defaultValue: 10 })
  limit?: number;

  @Field(() => Int, { defaultValue: 0 })
  offset?: number;

  @Field(() => String, { defaultValue: "" })
  search?: string;
}

@InputType()
export class InputEncryptedID {
  @Field(() => EncryptedID)
  id: string;
}
