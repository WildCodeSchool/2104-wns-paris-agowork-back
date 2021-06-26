import { Length } from "class-validator";
import { Field, InputType } from "type-graphql";
import { Role } from "./EnumType";
// import { IsEmailAlreadyExist } from "../../Utils/emailVerificator";
import { User } from "./userSchema";

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
  // @IsEmail()
  // @IsEmailAlreadyExist({ message: "email already in use" })
  email!: string;

  @Field(() => String)
  password!: string;
}