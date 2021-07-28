import { Resolver, Mutation, Arg, Ctx, Query } from "type-graphql";
import bcrypt from "bcryptjs";
import { User } from "../../Models/UserModel/userSchema";
import { UserModel } from "../../Models/UserModel/userSchema";
import { Context } from "../../Config/context";
import { AuthenticationError } from "apollo-server";
const { getToken, encryptPassword, comparePassword } = require("../../Utils/security")

@Resolver()
export default class LoginResolver {
  
  @Mutation(() => User)
  async login(
    @Arg("password", () => String) password: string,
    @Arg("email", () => String) email: string,
  ): Promise<User | null> {

    const user = await UserModel.findOne({ email: email } );
    if (!user) {
      throw new Error('User not found');
    }
    const isMatch = await comparePassword(password, user.password)
    if (isMatch) {
      user.token = getToken(user);
      return user ;
    } else {
        throw new AuthenticationError("Wrong Password!")
    }
  }
}