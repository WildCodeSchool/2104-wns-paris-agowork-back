import { Resolver, Query, Arg, Mutation, Ctx } from "type-graphql";
import { User } from "../../models/userModel/user.schema";
import { UserModel } from "../../models/userModel/user.schema";
import { Context } from "../../models/userModel/context.interface";
import { Role } from "../../models/userModel/role.enum";
import { MoodInput } from "../../models/userModel/moodModel/mood.input";
import { Mood, MoodModel } from "../../models/userModel/moodModel/mood.schema";


@Resolver(Mood)
export default class MoodResolver {
  @Mutation(() => Mood)
  public async createMood(
    @Arg("input") input: MoodInput
  ): Promise<object | null> {
    const mood = new MoodModel(input);
    await mood.save();
    return mood;
  }

  @Mutation(() => Mood)
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

