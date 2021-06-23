import { Int, Resolver, Query, Arg, Mutation } from "type-graphql";
import { User } from "../../Models/UserModel/userSchema";
import { UserModel } from "../../Models/UserModel/userSchema";

@Resolver(User)
export class UserResolver {

    @Query(() => User, { nullable: true })
    public async getUserById(@Arg("id", () => String) id: string) {
        return await UserModel.findById(id)||null;
    }

    @Query(() => [User])
    public async getAllUsers() {
        return await UserModel.find();
    }

    @Mutation(() => User)
    public async createUser(
        @Arg("firstname", () => String) firstname: string,
        @Arg("lastname", () => String) lastname: string,
        @Arg("email", () => String) email: string,
        @Arg("town", () => String) town: string,
        @Arg("picture", () => String) picture: string,
        @Arg("password", () => String) password: string
    ) {
        await UserModel.init();
        const body: any = {
            firstname: firstname,
            lastname: lastname,
            email: email, 
            town: town,
            picture: picture,
            password: password,
        };
        const model = new UserModel(body);
        const result = await model.save();
        return result;
    }

    @Mutation(() => User)
    public async updateUser(
        @Arg("id", () => String) id: string,
        @Arg("firstname", () => String) firstname: string,
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
            picture: picture,
        };
        await UserModel.updateOne({ id: id }, body);
        return body;
    }
    
    @Mutation(() => User, { nullable: true })
    public async deleteUser(@Arg("id", () => String) id: string) {
        const user = await UserModel.findById(id);
        await UserModel.deleteOne({ id: id });
        return user;
    }
}