import "reflect-metadata";
import connectDB from "./Config/environnement.dev"
import initServer from "./server";

connectDB();
initServer();
