import "reflect-metadata";
import connectDB from "./config/environnement.dev"
import  initServer from "./server";

connectDB();
initServer();
