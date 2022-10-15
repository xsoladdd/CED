import { Field, ObjectType } from "type-graphql";
import { conn } from "../../../../config/db";
import { Cat } from "../../../../models";
import { InputEncryptedID } from "../../../generics/Inputs";
import { ReturnStructure } from "../../../generics/Response";

@ObjectType()
export class ReturnSelectedCat extends ReturnStructure {
  @Field(() => Cat)
  cat?: Cat;
}

export const getCat = async ({
  id,
}: InputEncryptedID): Promise<ReturnSelectedCat> => {
  const catRepo = conn.getRepository(Cat);
  const selectedCat = await catRepo.findOne({
    where: { id },
  });

  if (!selectedCat) {
    return {
      status: 0,
      errors: [{ field: "CAT", message: "CAT NOT FOUND" }],
    };
  }
  return {
    status: 1,
    cat: selectedCat,
  };
};
