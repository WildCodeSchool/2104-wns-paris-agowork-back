import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import bcrypt from "bcryptjs";
import { User } from "../../Models/UserModel/userSchema";
import { UserModel } from "../../Models/UserModel/userSchema";
import Context from "../../Config/context";

@Resolver()
export class LoginResolver {
  
  @Mutation(() => User, { nullable: true })
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() ctx: Context
  ): Promise<User | null> {
    const user = await UserModel.findOne({ where: { email } });

    if (!user) {
      return null;
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return null;
    }

    ctx.req.session!.id = user.id;
    return user;
  }
}