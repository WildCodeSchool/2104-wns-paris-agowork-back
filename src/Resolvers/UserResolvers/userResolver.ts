import { Resolver, Query, Arg, Mutation, Authorized } from "type-graphql";
import { Role, User } from "../../Models/UserModel/userSchema";
import bcrypt from "bcryptjs";
import { UserModel } from "../../Models/UserModel/userSchema";
const { getToken, encryptPassword, comparePassword } = require("../../Utils/security")


@Resolver(User)
export class UserResolver {

    // @Authorized()
    @Query(() => User, { nullable: true })
    public async getUserById(@Arg("id", () => String) id: string) {
        return await UserModel.findById(id)||null;
    }

    @Authorized(["ADMIN", "TEACHER"])
    @Query(() => [User])
    public async getAllUsers() {
        return await UserModel.find();
    }

    // @Authorized(["ADMIN"])
    @Mutation(() => User)
    public async createUser(
        @Arg("firstname", () => String) firstname: string,
        @Arg("role", () => Role) role: Role,
        @Arg("lastname", () => String) lastname: string,
        @Arg("email", () => String) email: string,
        @Arg("town", () => String) town: string,
        @Arg("picture", () => String) picture: string,
        @Arg("password", () => String) password: string
    ) {
        await UserModel.init();
        const hashedPassword = await bcrypt.hash(password, 12);
        const body: any = {
            firstname: firstname,
            lastname: lastname,
            email: email, 
            town: town,
            picture: picture,
            role: role,
            password: hashedPassword,
        };
        const model = new UserModel(body);
        await model.save();
        const token = getToken(model);
      return { firstname, role, lastname, email, town, picture, token }
        
    }

    @Authorized()
    @Mutation(() => User)
    public async updateUser(
        @Arg("id", () => String) id: string,
        @Arg("firstname", () => String) firstname: string,
        @Arg("role", () => Role) role: Role,
        @Arg("lastname", () => String) lastname: string,
        @Arg("email", () => String) email: string,
        @Arg("town", () => String) town: string,
        @Arg("picture", () => String) picture: string
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
    
    @Authorized(["ADMIN"])
    @Mutation(() => User, { nullable: true })
    public async deleteUser(@Arg("id", () => String) id: string) {
        const user = await UserModel.findById(id);
        await UserModel.deleteOne({ id: id });
        return user;
    }
}