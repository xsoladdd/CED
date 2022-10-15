import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";
import { Cat } from "../../../models";
import { InputEncryptedID, InputStructure } from "../../generics/Inputs";
import { addCat, InputAddCat } from "./mutation/addCat";
import { editCat, InputEditCat, ReturnEditedCat } from "./mutation/editCat";
import { getAllCat, ReturnCats } from "./queries/getAllCat";
import { getCat, ReturnSelectedCat } from "./queries/getCat";

@Resolver(Cat)
export class catResolver {
  @Query(() => ReturnSelectedCat)
  async getCat(
    @Arg("Input") input: InputEncryptedID
  ): Promise<ReturnSelectedCat> {
    return await getCat(input);
  }

  @Query(() => String)
  async ping(): Promise<String> {
    return "Ping successfull. hey thanks for the ping";
  }

  @Authorized()
  @Query(() => ReturnCats)
  async getAllCat(
    @Arg("Input", {
      nullable: true,
      defaultValue: { limit: 10, offset: 0, search: "" },
    })
    input: InputStructure
  ): Promise<ReturnCats> {
    return await getAllCat(input);
  }

  @Mutation(() => Cat)
  async addCat(@Arg("input") input: InputAddCat): Promise<Cat> {
    return await addCat(input);
  }

  @Mutation(() => ReturnEditedCat)
  async editCat(@Arg("input") input: InputEditCat): Promise<ReturnEditedCat> {
    return await editCat(input);
  }
}
