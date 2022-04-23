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
import { Context } from "../../utilitaire/context.type";
import { CampusModel } from "../../models/campusModel/campus.schema";

@Resolver(User)
export default class UserResolver {
  @Query(() => User)
  async getLoggedUserByEmail(@Ctx() ctx: Context): Promise<User> {
    const user = await UserModel.findOne({ email: ctx.email }).populate("campus").populate("mood").exec();
    if (!user) throw new Error("Aucun utilisateur trouvé");
    
    return user;
  }

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
}
