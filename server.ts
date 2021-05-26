import mongoose from "mongoose";
import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
mongoose.set("debug", true);
require("dotenv").config();

// database
mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}/${process.env.DB_DATABASE}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  autoIndex: true,
})
.then(() => console.log("Connected to database"))
.catch((err) => console.log(err));

// Middleware
const app = express();

const bodyParser = require("body-parser");

app.use(express.json());
app.use(
  cors({ origin: `http://${process.env.API_CREDENTIALS}`, credentials: true }),
);


app.use(bodyParser.urlencoded({ extended: false }));

//const routes = require("./src/routing/router");

//app.use(routes);

app.listen(`${process.env.PORT}`, () => {
  console.log(
    "Server running at `http://${process.env.HOST}:${process.env.PORT}`",
  );
});