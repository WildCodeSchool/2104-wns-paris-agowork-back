import { Resolver, Query, Arg, Mutation, Ctx, Authorized, ID } from "type-graphql";
import { User } from "../../models/userModel/user.schema";
import { UserModel } from "../../models/userModel/user.schema";
import { Context } from "../../utils/context.interface";
import { Role } from "../../models/userModel/role.enum";
import { MoodInput } from "../../models/moodModel/mood.input";
import { Mood, MoodModel } from "../../models/moodModel/mood.schema";


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

  @Query(() => [Mood])
  async getMoods(): Promise<Mood[]> {
    const mood = await MoodModel.find().sort({updatedAt: -1}).exec();
    return mood;
  }

  // @Mutation(() => Mood)
  // public async updateMood(
  //   @Arg("input") input: MoodInput,
  //   @Ctx() ctx: Context,
  // ): Promise<object | null> {
  //   console.log(input);
  //   const mood = await UserModel.findOneAndUpdate({email: input.email}, input, {
  //     new: true,
  //   });
  //   return mood;
  // }

  @Query(() => [User])
  public async getAllStudentsByMood(): Promise<User[]> {
    const role = "STUDENT" as Role ;
    const users = await UserModel.find({role}).limit(10).populate('mood').exec();
    return users;
  }

  @Authorized(["ADMIN", "SUPERADMIN"])
  @Mutation(() => Mood, { nullable: true })
  public async deleteMood(@Arg("id", () => ID) id: string) {
    const mood = await MoodModel.findByIdAndDelete(id);
    if (!mood) throw new Error('Aucun mood ne correspond à la demande');
    return mood;
  }
}

