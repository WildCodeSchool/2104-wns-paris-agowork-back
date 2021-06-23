import bcrypt from "bcryptjs";
import { Resolver, Query, Mutation, Arg, UseMiddleware } from "type-graphql";
import { UserModel } from "../../Models/UserModel/userSchema";
import { User } from "../../Models/UserModel/userSchema";;
import { logger } from "../../Config/Middleware/logger";
import { isAuth } from "../../Config/Middleware/isAuth";
import { UserInput } from "../../Models/UserModel/userInput";

@Resolver()
export class RegisterResolver {
  // @UseMiddleware(isAuth, logger)
  @Mutation(() => User)
  async register(@Arg('input')
  {
    email,
    firstname,
    lastname,
    password
  }: UserInput): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await UserModel.create({
      firstname,
      lastname,
      email,
      password: hashedPassword
    })
    await user.save();
    return user;
  }
}