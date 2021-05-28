import "reflect-metadata";
import express from "express";
import cors from 'cors'
import mongoose from "mongoose";
import {ApolloServer} from "apollo-server-express";
import {buildSchema} from "type-graphql";
import {GraphQLSchema} from "graphql";
import {UserResolver} from "./src/Controllers/UserController/UserResolver";
import config  from "./src/config/environnement.dev";
import dotenv from "dotenv";
require("dotenv").config();

mongoose.set("debug", true);

const startserver = async () => {
  config()
  const schema:GraphQLSchema = await buildSchema({
    resolvers: [UserResolver],
    emitSchemaFile: true,
    validate: false,
  })

  const server = new ApolloServer({ schema })
  await server.start()

  const app = express()
  app.use(cors())

  server.applyMiddleware({ app })

  app.listen(`${process.env.PORT}`)
  console.log(
    console.log(
      `Server ready  at http://localhost:${process.env.PORT}`
  )
  )
  return { server, app }
}
startserver()