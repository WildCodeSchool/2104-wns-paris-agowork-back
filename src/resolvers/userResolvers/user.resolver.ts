import {
  Resolver,
  Query,
  Arg,
  Mutation,
  Authorized,
  Ctx,
  ID,
} from "type-graphql";
import { User } from "../../models/userModel/user.schema";
import bcrypt from "bcryptjs";
import { UserModel } from "../../models/userModel/user.schema";
import { UserInput } from "../../models/userModel/user.input";
import { Role } from "../../models/userModel/role.enum";
import { Context } from "../../utilitaire/context.interface";
import { CampusModel } from "../../models/campusModel/campus.schema";
import { Mood, MoodModel } from "../../models/moodModel/mood.schema";
import { getToken } from "../../utilitaire/security";

@Resolver(User)
export default class UserResolver {
  @Authorized(["ADMIN", "SUPERADMIN"])
  @Query(() => [User])
  async getAllUsers(): Promise<User[]> {
    const users = await UserModel.find().sort({updatedAt: -1}).populate('campus').populate('mood').exec();
    return users;
  }

  // @Authorized()
  @Query(() => User)
  async getLoggedUserByEmail(@Ctx() ctx: Context): Promise<User> {
    const user = await UserModel.findOne({ email: ctx.authenticatedUserEmail });
    if (!user) throw new Error("Aucun utilisateur trouvé");
    return user;
  }

  @Authorized(["ADMIN", "SUPERADMIN"])
  @Mutation(() => User)
  async createUser(@Arg("input") input: UserInput): Promise<User> {
    const hashedPassword = await bcrypt.hashSync(input.password, 12);
    const campus = await CampusModel.findById({ _id: input.campus }).exec();
    const mood = await MoodModel.findById({ _id: "61ba24253b74a6001ac83262" }).exec();
    if (!campus) throw new Error('Campus introuvable');
    if (!mood) throw new Error('Mood introuvable');
    const body = {
      firstname: input.firstname,
      lastname: input.lastname,
      town: input.town,
      email: input.email,
      picture: input.picture || undefined,
      role: input.role,
      campus: campus.id,
      mood: mood.id,
      password: hashedPassword,
    };
    let user = await(await UserModel.create(body)).save();
    user = await user.populate('campus').populate('mood').execPopulate();
    return user;
  }

  // @Authorized()
  @Mutation(() => User)
  public async updateUser(
    @Arg("id", () => String) id: string,
    @Arg("firstname", () => String) firstname: string,
    @Arg("role", () => Role) role: Role,
    @Arg("lastname", () => String) lastname: string,
    @Arg("email", () => String) email: string,
    @Arg("town", () => String) town: string,
    @Arg("picture", () => String) picture: string,
  ) {
    const body: any = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      town: town,
      role: role,
      picture: picture,
    };
    await UserModel.updateOne({ id: id }, body);
    return body;
  }

  @Authorized(["ADMIN", "SUPERADMIN"])
  @Mutation(() => User, { nullable: true })
  public async deleteUser(@Arg("id", () => ID) id: string) {
    const user = await UserModel.findByIdAndDelete(id);
    if (!user) throw new Error('Aucun user ne correspond à la demande');
    return user;
  }
}
