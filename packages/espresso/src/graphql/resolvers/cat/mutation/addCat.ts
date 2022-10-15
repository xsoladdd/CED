import { MaxLength } from "class-validator";
import { InputType, Field } from "type-graphql";
import { conn } from "../../../../config/db";
import { Cat } from "../../../../models";

@InputType()
export class InputAddCat {
  @Field()
  @MaxLength(30)
  firstName: string;

  @Field()
  @MaxLength(30)
  lastName: string;

  @Field()
  age: number;
}

export const addCat = async ({
  firstName,
  lastName,
  age,
}: InputAddCat): Promise<Cat> => {
  const catRepo = conn.getRepository(Cat);
  const newCat = new Cat();
  newCat.age = age;
  newCat.firstName = firstName;
  newCat.lastName = lastName;
  return await catRepo.save(newCat);
};
