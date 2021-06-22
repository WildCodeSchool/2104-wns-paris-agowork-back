import dotenv from "dotenv";
require("dotenv").config();

export const config:any = {
  uri: `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}/${process.env.DB_DATABASE}`, 
  options:  {useNewUrlParser: true, useUnifiedTopology: true}, 
  apolloPort: `${process.env.PORT}`, 
  autoListen: true, 
  verbose:true
};
