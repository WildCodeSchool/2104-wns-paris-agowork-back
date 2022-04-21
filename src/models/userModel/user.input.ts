import { Ref } from "@typegoose/typegoose";
import { IsEmail, Length } from "class-validator";
import { Field, ID, InputType } from "type-graphql";
import { IsEmailAlreadyExist } from "../../utilitaire/emailVerificator";
import { Campus } from "../campusModel/campus.schema";
import { Mood } from "../moodModel/mood.schema";
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

  @Field(() => Boolean)
  needHelp!: boolean;

  @Field(() => ID, { nullable: true })
  campus!: Ref<Campus>

  @Field(() => ID, { nullable: true })
  mood!: Ref<Mood>
}