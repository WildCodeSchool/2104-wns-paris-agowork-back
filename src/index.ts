import "reflect-metadata";
import { config } from "./Config/environnement.dev";
import { startServer } from "./server";

startServer(config);