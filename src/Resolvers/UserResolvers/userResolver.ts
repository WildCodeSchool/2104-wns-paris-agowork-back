import { Resolver, Query, Arg, Mutation, Authorized, ID, Ctx } from "type-graphql";
import { User } from "../../Models/UserModel/userSchema";
import bcrypt from "bcryptjs";
import { UserModel } from "../../Models/UserModel/userSchema";
import { UserInput } from "../../Models/UserModel/userInput";
import { Role } from "../../Models/UserModel/enumType";
const { getToken } = require("../../Utils/security");

@Resolver(User)
export default class UserResolver {
  // @Authorized(["ADMIN", "TEACHER"])
  @Query(() => [User])
  async getAllUsers(): Promise<User[]> {
    const users = await UserModel.find().exec();

    return users;
  }

  @Query(() => User)
  async currentUser(
    @Ctx() context: any
  ): Promise<any | null> {
    return context.user;
  }

  // @Authorized()
  @Query(() => User)
  async getUserById(@Arg("id", () => ID) id: string): Promise<User> {
    const user = await UserModel.findById(id).exec();

    if (!user) throw new Error("user not found");

    return user;
  }

  // @Authorized(["ADMIN"])
  @Mutation(() => User)
  async createUser(
    @Arg("input") input: UserInput): Promise<User|null> {
    const hashedPassword = await bcrypt.hashSync(input.password, 12);
    const payload = {userEmail: input.email,
                    userRole: input.role};

    const token = getToken(payload);
   
    const body = {
      firstname: input.firstname,
      lastname: input.lastname,
      town: input.town,
      email: input.email,
      picture: input.picture || undefined,
      role: input.role,
      password: hashedPassword,
      token: token,
    };

    const user = new UserModel(body);
    await user.save();
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

  // @Authorized(["ADMIN"])
  @Mutation(() => User, { nullable: true })
  public async deleteUser(@Arg("id", () => String) id: string) {
    const user = await UserModel.findById(id);
    await UserModel.deleteOne({ id: id });
    return user;
  }
}
