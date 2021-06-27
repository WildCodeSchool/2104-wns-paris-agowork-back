import "reflect-metadata";
import mongoose from "mongoose";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { authenticationChecker } from "./Utils/authChecker";
const { getPayload } = require("./Utils/security");

export default async function initServer(): Promise<void> {
  try {
    const server = new ApolloServer({
      cors: true,
      schema: await buildSchema({
        resolvers: [`${__dirname}/Resolvers/**/*.{ts,js}`],
        validate: false,
        authChecker: authenticationChecker,
      }),
      context: async ({ req }: any) => {
        let authToken = null;
        let currentUser = null;

        try {
          authToken = req.headers.authorization;

          if (authToken) {
            currentUser = await getPayload(authToken);
          }
        } catch (err) {
          console.warn(`Unable to authenticate using auth token: ${authToken}`);
        }

        return {
          authToken,
          currentUser,
        };
      },
    });

    const { url } = await server.listen();
    // eslint-disable-next-line no-console
    console.log(`🚀 Server ready at ${url}`);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
}
function getUser(token: any) {
  throw new Error("Function not implemented.");
}

