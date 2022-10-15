import { conn } from "../../config/db";
import { Permissions } from "../../models/Permissions/Permissions";
import { TypedResponse, IReturn, TypedRequestBody } from "../../types";
import { errorHandler } from "../../utils/errorHandler";

export const getPermissions = async (
  req: TypedRequestBody<any>,
  res: TypedResponse<IReturn<Permissions>>
) => {
  if (!req.ctx || !req.ctx.id) {
    return errorHandler("authentication", {
      message: "Invalid ID",
    });
  }

  const catRepo = conn.getRepository(Permissions);
  const x = await catRepo.findOne({
    where: { user: { id: req.ctx.id } },
    relations: { storeAccounts: true },
  });
  if (!x) return errorHandler("validation", { message: "no user found" });
  return res.status(200).json({
    status: 1,
    data: x,
  });
};
