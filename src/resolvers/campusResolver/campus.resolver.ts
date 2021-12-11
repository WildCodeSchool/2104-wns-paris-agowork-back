import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { CampusInput } from "../../models/campusModel/campus.input";
import { Campus, CampusModel } from "../../models/campusModel/campus.schema";

@Resolver(Campus)
export default class CampusResolver {
  @Mutation(() => Campus)
  async createCampus(@Arg("input") input: CampusInput): Promise<Campus | null> {
    const campus = new CampusModel(input);
    await campus.save();
    return campus;
  }

  @Query(() => [Campus])
  async getCampus(): Promise<Campus[]> {
    const campus = await CampusModel.find().sort({updatedAt: -1}).exec();
    return campus;
  }
}
