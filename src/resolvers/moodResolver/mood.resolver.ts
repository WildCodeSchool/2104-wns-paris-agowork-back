import { Resolver, Query, Arg, Mutation, Ctx, Authorized, ID } from "type-graphql";
import { User } from "../../models/userModel/user.schema";
import { UserModel } from "../../models/userModel/user.schema";
import { Context } from "../../utilitaire/context.interface";
import { Role } from "../../models/userModel/role.enum";
import { MoodInput } from "../../models/moodModel/mood.input";
import { Mood, MoodModel } from "../../models/moodModel/mood.schema";
import { CampusModel } from "../../models/campusModel/campus.schema";


@Resolver(Mood)
export default class MoodResolver {

  @Query(() => [Mood])
  async getMoods(): Promise<Mood[]> {
    const mood = await MoodModel.find().sort({updatedAt: -1}).exec();
    return mood;
  }
  
  @Mutation(() => User)
  public async updateUserMood(
    @Arg("id", () => ID) id: string,
    @Arg("email", () => String) email: string,
  ): Promise<object | null> {
    const updatedUser = await UserModel.findOneAndUpdate({ email: email }, {mood: id}, {
      new: true,
    })
    await updatedUser?.populate('mood').execPopulate();
    console.log(updatedUser)
    return updatedUser;
  }

  @Query(() => [User])
  public async getAllStudentsByMood(
    @Ctx() ctx: Context,
  ): Promise<User[]> {
    const role = "STUDENT" as Role ;
    const campus = await CampusModel.findOne({ name: ctx.authenticatedUserCampus });
    const campusId = campus?._id;
    const users = await UserModel.find({role, campus: campusId}).limit(10).populate('mood').exec();
    return users;
  }

  @Authorized(["ADMIN", "SUPERADMIN"])
  @Mutation(() => Mood, { nullable: true })
  public async deleteMood(@Arg("id", () => ID) id: string) {
    const mood = await MoodModel.findByIdAndDelete(id);
    if (!mood) throw new Error('Aucun mood ne correspond à la demande');
    return mood;
  }

  @Authorized(["ADMIN", "SUPERADMIN"])
  @Mutation(() => Mood)
  public async createMood(
    @Arg("input") input: MoodInput
  ): Promise<object | null> {
    const mood = new MoodModel(input);
    await mood.save();
    return mood;
  }
}

