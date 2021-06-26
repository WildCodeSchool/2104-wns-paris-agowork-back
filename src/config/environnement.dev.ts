import dotenv from "dotenv";
import { connect } from "mongoose";
require("dotenv").config();

const dbUrl = `mongodb://localhost:${process.env.DB_PASS}/${process.env.DB_DATABASE}`;

const options = { 
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
  autoIndex: true
}; 


export default async function connectDB(): Promise<void> {
  try {
    await connect(dbUrl, options);
    // eslint-disable-next-line no-console
    console.log('Connected to database');
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(`Error during Database Connection : ${err}`);
  }
}