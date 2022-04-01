import { Response } from "express";

const OK = function (res: Response, data: any, statusCode: number) {
  res.status(statusCode).send(data);
};
const ERROR = function (res: Response, statusCode: number, message: string) {
  res.status(statusCode).send(message);
};
export { OK, ERROR };
