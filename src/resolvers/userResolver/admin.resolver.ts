import {
    Resolver,
    Query,
    Arg,
    Mutation,
    Authorized,
    ID,
  } from "type-graphql";
  import { User } from "../../models/userModel/user.schema";
  import bcrypt from "bcryptjs";
  import { UserModel } from "../../models/userModel/user.schema";
  import { UserInput } from "../../models/userModel/user.input";
  import { CampusModel } from "../../models/campusModel/campus.schema";
  import { MoodModel } from "../../models/moodModel/mood.schema";
  
  @Resolver(User)
  export default class AdminResolver {
    @Authorized(["ADMIN", "SUPERADMIN"])
    @Mutation(() => User)
    async createUser(@Arg("input") input: UserInput): Promise<User> {
      console.log(input);
      const hashedPassword = await bcrypt.hashSync(input.password, 12);
      const campus = await CampusModel.findById({ _id: input.campus }).exec();
      console.log(campus)
      const mood = await MoodModel.findOne({ name: "Au top" }).exec();
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
        password: hashedPassword,
        mood: mood.id,
      };
      let user = await(await UserModel.create(body)).save();
      console.log(user);
      user = await user.populate('campus').populate('mood').execPopulate();
      return user;
    }
  
    @Authorized(['ADMIN', 'SUPERADMIN'])
    @Mutation(() => User, { nullable: true })
    async deleteUser(@Arg("id", () => ID) id: string) {
      const user = await UserModel.findByIdAndDelete(id);
      if (!user) throw new Error('Aucun utilisateur ne correspond à la demande');
      return user;
    }
  
    @Authorized(['ADMIN', 'SUPERADMIN'])
    @Query(() => [User])
    async getAllUsers(): Promise<User[]> {
      const users = await UserModel.find().sort({updatedAt: -1}).populate('campus').populate('mood').exec();
      return users;
    }

    @Authorized(['ADMIN', 'SUPERADMIN'])
    @Query(() => User, { nullable: true })
    async getUserById(@Arg("id", () => ID) id: string) {
      const user = await UserModel.findById(id).populate('campus').populate('mood').exec();
      console.log(user);
      if (!user) throw new Error('Aucun utilisateur ne correspond à la demande');
      return user;
    }
  }
  