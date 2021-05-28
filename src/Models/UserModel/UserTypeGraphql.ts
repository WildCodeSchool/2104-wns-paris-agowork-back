import { Field, ID, ObjectType } from "type-graphql";

export enum Role {
    User = "USER",
    Admin = "ADMIN",
    Teacher = "TEACHER",
}

@ObjectType()
export class User {
    @Field(type=>ID, {nullable: true})
    id:string = "";

    @Field(type=>String, {nullable: true})
    firstname:string = "";
    
    @Field(type=>String, {nullable: true})
    lastname:string = "";

    @Field(type=>String, {nullable: true})
    email:string = "";

    @Field(type=>String, {nullable: true})
    town:string = "";

    @Field(type=>String, {nullable: true})
    picture:string = "";

    @Field(type => Role)
    role!: Role;
}