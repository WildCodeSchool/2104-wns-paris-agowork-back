import dotenv from "dotenv";
require("dotenv").config();

export const config:any = {
  uri: `mongodb://mongodb:${process.env.DB_PASS}/${process.env.DB_DATABASE}`, 
  options:  {useNewUrlParser: true, useUnifiedTopology: true}, 
  apolloPort: `4000`, 
  autoListen: true, 
  verbose:true
};
