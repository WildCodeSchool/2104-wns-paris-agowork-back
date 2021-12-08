import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { User } from "../../models/userModel/user.schema";
import { UserModel } from "../../models/userModel/user.schema";
import { MoodInput } from "../../models/userModel/user.input";

@Resolver(User)
export default class MoodResolver {
  @Mutation(() => User)
  public async updateMood(
    @Arg("input") input: MoodInput,
  ): Promise<User | null> {
    const mood = await UserModel.findByIdAndUpdate(input.id, input, {
      new: true,
    });
    return mood;
  }

  @Query(() => User)
  public async getAllUsersByMood(@Arg("id") id: string): Promise<User[]> {
    const users = await UserModel.find({ town: "Brest" }).limit(2).exec();
    return users;
  }
}
