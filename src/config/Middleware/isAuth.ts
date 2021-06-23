import { Request } from "express";
import { MiddlewareFn } from "type-graphql";
import Context from "../context";

export const isAuth: MiddlewareFn<Context> = async ({ context }, next) => {
  if (!context.req.session!.id) {
    throw new Error("not authenticated");
  }

  return next();
};