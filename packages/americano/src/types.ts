import { Response, Request } from "express";
import { Send } from "express-serve-static-core";

type TStatus = 1 | 0;

export interface IReturn<T> {
  data?: T;
  status: TStatus;
  error_title?: string;
  error_params?: any;
}

export interface TypedResponse<T> extends Response {
  json: Send<T, this>;
}

export interface ICtx {
  id: string;
}
export interface TypedRequestBody<T = any> extends Request {
  body: T;
  ctx?: ICtx;
}

export interface IError {
  title: string;
  params?: any;
}
