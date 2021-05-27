import { Int, Resolver, Query, Arg, Mutation } from "type-graphql";
import { User } from "../model/graphql/User";
import UserModel from "../model/UserModel";

@Resolver(User)
export class UserResolver {

    // cette méthode est une query, çàd qu'elle va servir à la lecture de données
    // elle retourne un wilder ou null (en fonction de si l'id correspond bien à un document)
    @Query(returns => User, { nullable: true })
    public async getUserById(@Arg("id", type => String) id: string) {
        // si l'id n'existe pas, mongoose renvoie undefined, ce qui me permet 
        // de renvoyer null parce que, rappel: 
        // undefined || something ---  renvoie toujours something
        return await UserModel.findById(id)||null;
    }

    // cette méthode est une query, çàd qu'elle va servir à la lecture de données
    // elle retourne tous les documents de type Wilder
    @Query(returns => [User])
    public async getAllUsers() {
        return await UserModel.find();
    }

    // cette méthode est une mutation, çàd qu'elle va servir à écrire /modifier/supprimer de la donnée
    // elle retourne le wilder nouvellement crée
    @Mutation(returns => User)
    public async createUser(
        @Arg("firstname", type => String) firstname: string,
        @Arg("lastname", type => String) lastname: string
    ) {
        await UserModel.init();
        const body: any = {
            firstname: firstname,
            lastname: lastname,
        };
        const model = new UserModel(body);
        const result = await model.save();
        return result;
    }

    // cette méthode est une mutation, çàd qu'elle va servir à écrire /modifier/supprimer de la donnée
    // elle retourne le wilder mis à jour
    @Mutation(returns => User)
    public async updateUser(
        @Arg("id", type => String) id: number,
        @Arg("firstname", type => String) firstname: string,
        @Arg("lastname", type => String) lastname: string
    ) {
        const body: any = { firstname: firstname, lastname: lastname };
        await UserModel.updateOne({ _id: id }, body);
        return await UserModel.findById(id);
    }
    
    // cette méthode est une mutation, çàd qu'elle va servir à écrire /modifier/supprimer de la donnée
    // elle retourne le wilder supprimé
    @Mutation(returns => User, { nullable: true })
    public async deleteUser(@Arg("id", type => String) id: string) {
        const user = await UserModel.findById(id);
        await UserModel.deleteOne({ _id: id });
        return user;
    }

}