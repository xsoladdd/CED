import { Request } from "express";

export interface IcontextObject {
  req: Request;
  token: string;
  id: string;
}
