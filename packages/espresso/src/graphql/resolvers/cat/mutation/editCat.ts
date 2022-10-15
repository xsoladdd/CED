import { Field, InputType, ObjectType } from "type-graphql";
import { conn } from "../../../../config/db";
import { Cat } from "../../../../models";
import { ReturnStructure } from "../../../generics/Response";
import { EncryptedID } from "../../../scalars/EncryptedID";

@InputType()
export class InputEditCat {
  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field({ nullable: true })
  age?: number;

  @Field(() => EncryptedID)
  id: string;
}

@ObjectType()
export class ReturnEditedCat extends ReturnStructure {
  @Field(() => Cat)
  cat?: Cat;
}

export const editCat = async ({
  firstName,
  lastName,
  age,
  id,
}: InputEditCat): Promise<ReturnEditedCat> => {
  const catRepo = conn.getRepository(Cat);
  const selectedCat = await catRepo.findOneBy({ id });

  if (!selectedCat) {
    return {
      status: 0,
      errors: [{ field: "CAT", message: "CAT NOT FOUND" }],
    };
  }

  if (age) selectedCat.age = age;
  if (firstName) selectedCat.firstName = firstName;
  if (lastName) selectedCat.lastName = lastName;

  const saved = await catRepo.save(selectedCat);
  return {
    cat: saved,
  };
};
