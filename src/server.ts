import "reflect-metadata";
import mongoose from "mongoose";
import {ApolloServer} from "apollo-server";
import {buildSchema} from "type-graphql";
import {GraphQLSchema} from "graphql";
import { authChecker } from "./Utils/authChecker";
const { getPayload } = require('./Utils/security');

export async function startServer(config:any):Promise<ApolloServer>{

  const schema:GraphQLSchema = await buildSchema({
    resolvers:[`${__dirname}/Resolvers/**/*.{ts,js}`],
    authChecker,
    authMode: "null",
  });
  // const server:ApolloServer = new ApolloServer({schema});

  const server = new ApolloServer({
    schema,
    context: ({ req }) => {
      // get the user token from the headers
      const token = req.headers.authorization || '';
      // try to retrieve a user with the token
      const { payload: user, loggedIn } = getPayload(token);
  
      // add the user to the context
      return { user, loggedIn };
    },
  })
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
