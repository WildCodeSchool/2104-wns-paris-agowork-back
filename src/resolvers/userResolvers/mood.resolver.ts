import { Resolver, Query, Arg, Mutation, Ctx } from "type-graphql";
import { User } from "../../models/userModel/user.schema";
import { UserModel } from "../../models/userModel/user.schema";
import { MoodInput } from "../../models/userModel/user.input";
import { Context } from "../../models/userModel/context.interface";
import { Role } from "../../models/userModel/role.enum";


@Resolver(User)
export default class MoodResolver {
  @Mutation(() => User)
  public async updateMood(
    @Arg("input") input: MoodInput,
    @Ctx() ctx: Context,
  ): Promise<object | null> {
    console.log(input);
    // if (!input.email == ctx.authenticatedUserEmail) {
    //   throw new Error("une erreur est survenue");
    // }
    const mood = await UserModel.findOneAndUpdate({email: input.email}, input, {
      new: true,
    });
    return mood;
  }

  @Query(() => [User])
  public async getAllStudentsByMood(): Promise<User[]> {
    const role = "STUDENT" as Role ;
    const users = await UserModel.find({role}).limit(10).exec();
    return users;
  }
}

