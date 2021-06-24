// import bcrypt from "bcryptjs";
// import { Resolver, Query, Mutation, Arg, UseMiddleware } from "type-graphql";
// import { UserModel } from "../../Models/UserModel/userSchema";
// import { User } from "../../Models/UserModel/userSchema";
// import { UserInput } from "../../Models/UserModel/userInput";
// import { AuthenticationError } from "apollo-server";
// const { getToken, encryptPassword, comparePassword } = require("../../Utils/security")


// @Resolver()
// export class RegisterResolver {
//   // @UseMiddleware(isAuth, logger)
//   @Mutation(() => User)
//   async register(
//     @Arg('input')
//   {
//     email,
//     firstname,
//     lastname,
//     password
//   }: UserInput): Promise<User> {
//     const hashedPassword = await bcrypt.hash(password, 12);
//     const user = await UserModel.findOne({ where: { email } })
//     if (user) {
//       throw new AuthenticationError("User Already Exists!")
//     }
//     try {
//       const regUser =  await UserModel.create({
//         firstname,
//         lastname,
//         email,
//         password: hashedPassword
//       })
//       await regUser.save();
//       const token = getToken(regUser);
//       return { ...regUser, token }
//     } catch (e) {
//       throw e
//     }
//   }
// }