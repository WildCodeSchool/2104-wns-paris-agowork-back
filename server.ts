import "reflect-metadata";
import mongoose from "mongoose";
import {ApolloServer} from "apollo-server";
import {buildSchema} from "type-graphql";
import {GraphQLSchema} from "graphql";
import {UserResolver} from "./src/controller/UserResolver";
import { config } from "./src/config/environnement.dev";
//import express, { Request, Response } from "express";
//import cors from "cors";
//import dotenv, { config } from "dotenv";
mongoose.set("debug", true);
require("dotenv").config();

export async function startServer(config:any):Promise<ApolloServer>{

const schema:GraphQLSchema = await buildSchema({resolvers:[UserResolver]});
const server:ApolloServer = new ApolloServer({schema});

if ( config.autoListen ) {
  await server.listen(config.apolloPort);
  
  if(config.verbose)
  console.log("Apollo server startd at http://localhost:"+config.apolloPort+"/");
}

// database
await mongoose.connect(config.uri, config.options);

if(config.verbose)
console.log("mongodb started at uri:", config.uri);

return server;

}

// Middleware
//const app = express();

//const bodyParser = require("body-parser");

//app.use(express.json());
//app.use(
  //cors({ origin: `http://${process.env.API_CREDENTIALS}`, credentials: true }),
//);


//app.use(bodyParser.urlencoded({ extended: false }));

//const routes = require("./src/routing/router");

//app.use(routes);

//app.listen(`${process.env.PORT}`, () => {
  //console.log(
    //"Server running at `http://${process.env.HOST}:${process.env.PORT}`",
  //);
//});