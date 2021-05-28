import dotenv from "dotenv";
require("dotenv").config();
import mongoose from 'mongoose'

const config = async (): Promise<void> => {
  try {
    const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}/${process.env.DB_DATABASE}`
    const connect = await mongoose.connect(uri, {
      useCreateIndex: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
    })
    console.log('DB connected')
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}
export default config
