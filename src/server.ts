import "reflect-metadata";
import mongoose from "mongoose";
import {ApolloServer} from "apollo-server";
import {buildSchema} from "type-graphql";
import {GraphQLSchema} from "graphql";
import {UserResolver} from "./Controllers/UserController/UserResolver";

//mongoose.set("debug", true);

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
