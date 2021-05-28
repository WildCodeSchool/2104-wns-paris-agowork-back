import "reflect-metadata";
import mongoose from "mongoose";
import {ApolloServer} from "apollo-server";
import {buildSchema} from "type-graphql";
import {GraphQLSchema} from "graphql";
import {UserResolver} from "./src/Controllers/UserController/UserResolver";
// import { config } from "./src/Config/environnement.dev";
import dotenv from "dotenv";
require("dotenv").config();

mongoose.set("debug", true);


export async function startServer(config:any):Promise<ApolloServer>{

const schema:GraphQLSchema = await buildSchema({resolvers:[UserResolver]});
const server:ApolloServer = new ApolloServer({schema});

if ( config.autoListen ) {
await server.listen(`${process.env.PORT}`);
  
  if(true)
  console.log(`Apollo server started at http://${process.env.HOST}:${process.env.PORT}`);
}

// database
await mongoose.connect(config.uri, config.options);

if(config.verbose)
console.log("mongodb started at uri:", config.uri);

return server;
}