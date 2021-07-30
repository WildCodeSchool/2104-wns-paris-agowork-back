import { Resolver, Arg, Mutation } from "type-graphql";
import bcrypt from "bcryptjs";
import { User } from "../../Models/UserModel/userSchema";
import { UserModel } from "../../Models/UserModel/userSchema";
import { ApolloError, AuthenticationError } from "apollo-server";
const { getToken } = require("../../Utils/security");

@Resolver()
export default class LoginResolver {
  @Mutation(() => User)
  async login(
    @Arg("password", () => String) password: string,
    @Arg("email", () => String) email: string,
  ): Promise<any> {

    const user = await UserModel.findOne({ email: email } );

    if (!user) {
      throw new ApolloError('User not found');
    }

    if (user && bcrypt.compareSync(password, user.password)) {
      const payload = {userEmail: user.email,
                      userRole: user.role};
      user.token = getToken(payload);
      return user;
    } else {
        throw new AuthenticationError("Wrong Password!");
    }
  }
}
