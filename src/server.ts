import "reflect-metadata";
import mongoose from "mongoose";
import {ApolloServer} from "apollo-server";
import {buildSchema} from "type-graphql";
import {GraphQLSchema} from "graphql";
import { authChecker } from "./Utils/authChecker";
const { getPayload } = require('./Utils/security');

export default async function initServer(): Promise<void> {
  try {
    const server = new ApolloServer({
      cors: true,
      schema: await buildSchema({
        resolvers: [`${__dirname}/Resolvers/**/*.{ts,js}`],
        validate: false,
      }),
    });

    const { url } = await server.listen();
    // eslint-disable-next-line no-console
    console.log(`🚀 Server ready at ${url}`);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
}
