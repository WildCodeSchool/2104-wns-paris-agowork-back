import { connect } from "mongoose";
import { createUser } from "../Fixtures/userData";
require("dotenv").config();

const dbUrl = `mongodb://mongodb:27017/agowork`;

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

    // IF YOU NEED FIXTURES, DECOMMENT LAST LINES 
    // AND RECOMMENT IT RIGHT AFTER YOUR SERVER HAS CHARGED
    // await createUser();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(`Error during Database Connection : ${err}`);
  }
}