import { Int, Resolver, Query, Arg, Mutation } from "type-graphql";
import { User } from "../../Models/UserModel/UserTypeGraphql";
import UserModel from "../../Models/UserModel/UserSchema";

@Resolver(User)
export class UserResolver {

    @Query(returns => User, { nullable: true })
    public async getUserById(@Arg("id", type => String) id: string) {
        return await UserModel.findById(id)||null;
    }

    @Query(returns => [User])
    public async getAllUsers() {
        return await UserModel.find();
    }

    @Mutation(returns => User)
    public async createUser(
        @Arg("firstname", type => String) firstname: string,
        @Arg("lastname", type => String) lastname: string,
        @Arg("email", type => String) email: string,
        @Arg("town", type => String) town: string,
        @Arg("picture", type => String) picture: string
    ) {
        await UserModel.init();
        const body: any = {
            firstname: firstname,
            lastname: lastname,
            email: email, 
            town: town,
            picture: picture,
        };
        const model = new UserModel(body);
        const result = await model.save();
        return result;
    }

    @Mutation(returns => User)
    public async updateUser(
        @Arg("id", type => String) id: number,
        @Arg("firstname", type => String) firstname: string,
        @Arg("lastname", type => String) lastname: string,
        @Arg("email", type => String) email: string,
        @Arg("town", type => String) town: string,
        @Arg("picture", type => String) picture: string
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
    
    @Mutation(returns => User, { nullable: true })
    public async deleteUser(@Arg("id", type => String) id: string) {
        const user = await UserModel.findById(id);
        await UserModel.deleteOne({ id: id });
        return user;
    }

}