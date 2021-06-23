import { Request } from "express";
import { MiddlewareFn } from "type-graphql";
import Context from "../context";

export const logger: MiddlewareFn<Context> = async ({ args }, next) => {
  console.log("args: ", args);
  return next();
};