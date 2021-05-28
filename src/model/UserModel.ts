import * as mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstname: String,
  lastname: String,
});

const model: mongoose.Model<any> = mongoose.model("user", UserSchema);
export default model;
