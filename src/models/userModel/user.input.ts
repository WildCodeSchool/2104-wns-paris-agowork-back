import { IsEmail, Length } from "class-validator";
import { Field, ID, InputType } from "type-graphql";
import { IsEmailAlreadyExist } from "../../utils/emailVerificator";
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

  @Field(() => String)
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
}

@InputType()
export class MoodInput implements Partial<User> {

  @Field(() => ID)
  id!: string

  @Field(() => Mood)
  mood!: Mood;
}