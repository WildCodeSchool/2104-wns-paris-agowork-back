import { Resolver, Mutation, Arg, Ctx, Query } from "type-graphql";
import bcrypt from "bcryptjs";
import { User } from "../../Models/UserModel/userSchema";
import { UserModel } from "../../Models/UserModel/userSchema";
import { Context } from "../../Config/context";
import { AuthenticationError } from "apollo-server";
const { getToken, encryptPassword, comparePassword } = require("../../Utils/security")

@Resolver(User)
export default class LoginResolver {
  
  @Mutation(() => User)
  async login(
    @Arg("email", () => String) email: string,
    @Arg("password", () => String) password: string,
    // @Ctx() ctx: Context
  ): Promise<User | null> {
    const user = await UserModel.findOne({ email: email } );
    if (!user) {
      throw new Error('User not found');
    }
    const isMatch = await comparePassword(password, user.password)
    if (isMatch) {
      const token = getToken(user)
      console.log(user)
        return {...user} ;
    } else {
        throw new AuthenticationError("Wrong Password!")
    }
  }
}