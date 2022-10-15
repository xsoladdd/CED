import { Request } from "express";
import { conn } from "../../config/db";
import { Cat } from "../../models";
import { IError, IReturn, TypedRequestBody, TypedResponse } from "../../types";
import { errorHandler } from "../../utils/errorHandler";
import { catSchema, idSchema } from "./validation";

export const getCats = async (
  _: Request,
  res: TypedResponse<IReturn<Array<Cat>>>
) => {
  const catRepo = conn.getRepository(Cat);
  const x = await catRepo.find();
  return res.status(200).json({
    status: 1,
    data: x,
  });
};

export const postCats = async (
  req: TypedRequestBody<{ firstname: string; lastname: string; age: number }>,
  res: TypedResponse<IReturn<Cat>>
) => {
  try {
    // Validation
    await catSchema.validate(req.body).catch((err) => {
      errorHandler("validation", err);
    });

    const { age, firstname, lastname } = req.body;

    const catRepo = conn.getRepository(Cat);
    const newCat = new Cat();
    newCat.age = age;
    newCat.firstName = firstname;
    newCat.lastName = lastname;

    const cat = await catRepo.save(newCat);

    res.status(200).json({
      status: 1,
      data: cat,
    });
  } catch (error) {
    const { title, params }: IError = JSON.parse(error.message);
    res.status(400).json({
      status: 0,
      error_title: title,
      error_params: params,
    });
  }
};

export const deleteCat = async (
  req: TypedRequestBody<{ id: string }>,
  res: TypedResponse<IReturn<any>>
) => {
  try {
    // Validation
    await idSchema.validate(req.body).catch((err) => {
      errorHandler("validation", err);
    });

    const { id } = req.body;
    const catRepo = conn.getRepository(Cat);
    await catRepo.softDelete({ id });

    res.status(200).json({
      status: 1,
    });
  } catch (error) {
    const { title, params }: IError = JSON.parse(error.message);
    res.status(400).json({
      status: 0,
      error_title: title,
      error_params: params,
    });
  }
};
