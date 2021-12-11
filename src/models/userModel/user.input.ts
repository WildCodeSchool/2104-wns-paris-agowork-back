import { Ref } from "@typegoose/typegoose";
import { IsEmail, Length } from "class-validator";
import { Field, ID, InputType } from "type-graphql";
import { IsEmailAlreadyExist } from "../../utils/emailVerificator";
import { Campus } from "../campusModel/campus.schema";
import { Mood } from "./mood.enum";
import { Role } from "./role.enum";
import { User } from "./user.schema";

@InputType()
export class UserInput implements Partial<User> {
  @Field(() => String)
  @Length(1, 255)
  firstname!: string;

  @Field(() => String)
  @Length(1, 255)
  lastname!: string;

  @Field(() => String)
  @Length(1, 255)
  town!: string;

  @Field(() => String, { nullable: true })
  @Length(1, 255)
  picture?: string;

  @Field(() => Role)
  role!: Role;

  @Field(() => String)
  @IsEmail()
  @IsEmailAlreadyExist({ message: "Ces identifiants existent déjà" })
  email!: string;

  @Field(() => String)
  password!: string;

  @Field(() => String, { nullable: true })
  campus!: Ref<Campus, string>
}

@InputType()
export class MoodInput implements Partial<User> {
  @Field(() => String)
  @IsEmail()
  email!: string;

  @Field(() => Mood, { nullable: true })
  mood!: Mood;
}