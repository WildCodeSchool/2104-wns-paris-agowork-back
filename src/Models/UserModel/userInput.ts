import { Length, IsEmail } from "class-validator";
import { Field, InputType } from "type-graphql";
import { IsEmailAlreadyExist } from "../../Utils/emailVerificator";
import { User } from "./userSchema";

@InputType()
export class UserInput implements Partial<User> {
  @Field(() => String)
  @Length(1, 255)
  firstname!: string | undefined;

  @Field(() => String)
  @Length(1, 255)
  lastname!: string;

  @Field(() => String)
  @IsEmail()
  @IsEmailAlreadyExist({ message: "email already in use" })
  email!: string;

  @Field(() => String)
  password!: string;
}