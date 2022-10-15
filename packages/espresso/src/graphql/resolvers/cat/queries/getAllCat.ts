import { ObjectType, Field, Int } from "type-graphql";
import { ILike } from "typeorm";
import { conn } from "../../../../config/db";
import { Cat } from "../../../../models";
import { InputStructure } from "../../../generics/Inputs";
import { ReturnStructure } from "../../../generics/Response";

@ObjectType()
export class ReturnCats extends ReturnStructure {
  @Field(() => Int)
  count: number;

  @Field(() => [Cat])
  cats: Cat[];
}

export const getAllCat = async ({
  limit,
  offset,
  search,
}: InputStructure): Promise<ReturnCats> => {
  const catRepo = conn.getRepository(Cat);
  const allCat = await catRepo.findAndCount({
    take: limit,
    skip: offset,
    where: {
      firstName: ILike(`%${search}%`),
    },
  });

  return {
    cats: allCat[0],
    count: allCat[1],
  };
};
