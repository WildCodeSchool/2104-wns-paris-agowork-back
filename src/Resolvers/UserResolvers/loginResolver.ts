import { Resolver, Mutation, Arg, Ctx, Query } from "type-graphql";
import bcrypt from "bcryptjs";
import { User } from "../../Models/UserModel/userSchema";
import { UserModel } from "../../Models/UserModel/userSchema";
import { Context } from "../../Config/context";
import { AuthenticationError } from "apollo-server";
const { getToken, encryptPassword, comparePassword } = require("../../Utils/security")

@Resolver()
export class LoginResolver {
  
  @Mutation(() => User, { nullable: true })
  async login(
    @Arg("email", () => String) email: string,
    @Arg("password", () => String) password: string,
    // @Ctx() ctx: Context
  ): Promise<User | null> {
    const user = await UserModel.findOne({ where: { email } });
    console.log(user)
    if (!user) {
      throw new Error('User not found');
    }
    const isMatch = await comparePassword(password, user.password)
    if (isMatch) {
        const token = getToken(user)
        return { ...user, token };
    } else {
        throw new AuthenticationError("Wrong Password!")
    }
    // const isPasswordValid = await bcrypt.compare(password, user.password);

    // if (!isPasswordValid) {
    //   return null;
    // }

    // ctx.req.session!.id = user.id;
    // return user;
  }

  // @Query(() => User)
  //   public async me(
  //     @Ctx() context: Context
  //   ) {
  //     if (context.loggedIn) {
  //       return context.user
  //   } else {
  //       throw new AuthenticationError("Please Login Again!")
  //   }
  //   }
}