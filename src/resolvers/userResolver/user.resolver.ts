import {
  Resolver,
  Query,
  Arg,
  Mutation,
  Ctx,
} from "type-graphql";
import { User } from "../../models/userModel/user.schema";
import { UserModel } from "../../models/userModel/user.schema";
import bcrypt from "bcryptjs";
import { Context } from "../../utilitaire/context.type";
import { UserInput } from "../../models/userModel/user.input";

@Resolver(User)
export default class UserResolver {
  @Query(() => User)
  async getLoggedUserByEmail(@Ctx() ctx: Context): Promise<User> {
    const user = await UserModel.findOne({ email: ctx.email }).populate("campus").populate("mood").exec();
    if (!user) throw new Error("Aucun utilisateur trouvé");
    return user;
  }

  @Mutation(() => User)
  async updateUser(@Arg("input") input: UserInput): Promise<User | null> {
    console.log("input", input);
    let password;
    if (input.password ===  null || input.password === undefined) {
      const user = await UserModel.findById({_id: input.id });
      if (!user) {
        throw new Error("Lutilisateur est introuvable");
      }
      password = user?.password;
    } else {
      password = bcrypt.hashSync(input.password, 12);
    }
    const body: any = {
      firstname: input.firstname,
      lastname: input.lastname,
      email: input.email,
      town: input.town,
      password: password,
      role: input.role,
      campus: input.campus,
    };
    const updatedUser = await UserModel.findOneAndUpdate({ _id: input.id }, body, {returnOriginal: false}).populate("campus").populate("mood").exec();
    console.log("updatedUser", updatedUser)
    if (!updatedUser) {
      throw new Error("La modification n'a pas pu être éffectuée. Si cela persiste, contactez vore administrateur");
    }
    return updatedUser;
  }
}
