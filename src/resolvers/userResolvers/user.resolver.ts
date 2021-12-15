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
import { Context } from "../../models/userModel/context.interface";
import { CampusModel } from "../../models/campusModel/campus.schema";
const { getToken } = require("../../Utils/security");

@Resolver(User)
export default class UserResolver {
  @Authorized(["ADMIN", "SUPERADMIN"])
  @Query(() => [User])
  async getAllUsers(): Promise<User[]> {
    const users = await UserModel.find().sort({updatedAt: -1}).exec();
    return users;
  }

  // @Authorized()
  @Query(() => User)
  async getLoggedUserByEmail(@Ctx() ctx: Context): Promise<User> {
    const user = await UserModel.findOne({ email: ctx.authenticatedUserEmail });
    if (!user) throw new Error("user not found");
    console.log(user);
    return user;
  }

  @Authorized(["ADMIN", "SUPERADMIN"])
  @Mutation(() => User)
  async createUser(@Arg("input") input: UserInput): Promise<User> {
    const hashedPassword = await bcrypt.hashSync(input.password, 12);
    const campus = await CampusModel.findById({ _id: input.campus }).exec();
    if (!campus) throw new Error('Campus introuvable');
    const body = {
      firstname: input.firstname,
      lastname: input.lastname,
      town: input.town,
      email: input.email,
      picture: input.picture || undefined,
      role: input.role,
      campus: campus.name,
      password: hashedPassword,
    };
    
    const user = await(await UserModel.create(body)).save();
    console.log(user);
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
