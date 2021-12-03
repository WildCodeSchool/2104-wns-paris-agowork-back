import { connect } from "mongoose";
require("dotenv").config();
const dbLink = process.env.DB_LINK;
console.log('dblink' + dbLink);

const dbUrl = 'mongodb://' + dbLink + ':27017/agowork';

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