import "reflect-metadata";
import mongoose from "mongoose";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { authenticationChecker } from "./Utils/authChecker";
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.SECRET_JWT;

export default async function initServer(): Promise<void> {
  try {
    const server = new ApolloServer({
      cors: true,
      schema: await buildSchema({
        resolvers: [`${__dirname}/Resolvers/**/*.{ts,js}`],
        validate: false,
        authChecker: authenticationChecker,
      }),
      context: ({ req }: any) => {
        const token = req.headers.authorization;
        if (token) {
          let payload;
          try {
            payload = jwt.verify(token, secret);
            return { 
              authenticatedUserEmail: payload.userEmail, 
              authenticatedUserRole: payload.userRole,
              authenticatedUserFirstname: payload.userFirstname,
              authenticatedUserLastname: payload.userLastname
            };
          } catch (err) {}
        }
      },
    });

    const { url } = await server.listen(4000);
    // eslint-disable-next-line no-console
    console.log(`🚀 Server ready at ${url}`);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
}
