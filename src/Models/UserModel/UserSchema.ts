import * as mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstname: String,
  lastname: String,
  email: String,
  town: String,
  picture: String,
  role: {
    type: String,
    enum : ['USER', 'ADMIN', 'TEACHER'],
    default: 'USER'
  },
});

const model: mongoose.Model<any> = mongoose.model("user", UserSchema);
export default model;
