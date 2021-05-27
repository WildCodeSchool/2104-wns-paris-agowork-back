import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class User {
    @Field(type=>ID, {nullable: true})
    id:string = "";

    @Field(type=>String, {nullable: true})
    firstname:string = "";
    

    @Field(type=>String, {nullable: true})
    lastname:string = "";
}