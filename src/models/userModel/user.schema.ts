import { Field, ID, ObjectType } from "type-graphql";
import {
  Prop,
  getModelForClass,
  Ref,
} from "@typegoose/typegoose";
import { Role } from "./role.enum";
import { Campus } from "../campusModel/campus.schema";
import { Mood } from "./moodModel/mood.schema";

@ObjectType()
export class User {
  @Field(() => ID)
  id!: string;

  @Field(() => String, { nullable: true })
  @Prop({ required: false })
  token?: string;

  @Field(() => String, { nullable: true })
  @Prop({ required: false })
  isActive!: boolean;

  @Field(() => Role)
  @Prop({ enum: Role, type: String, required: true })
  role!: Role;

  @Field()
  @Prop({ trim: true, required: true, unique: false })
  firstname!: string;

  @Field()
  @Prop({ trim: true, required: true, unique: false })
  lastname!: string;

  @Field()
  @Prop({ trim: true, required: true, unique: true })
  email!: string;

  @Prop({ trim: true, required: true })
  password!: string;

  @Field(() => String, { nullable: true })
  @Prop({ trim: true, required: false })
  town?: string;

  @Field(() => String, { nullable: true })
  @Prop({ trim: true, required: false })
  picture?: string;

  @Field(() => Campus, { nullable: true })
  @Prop({ ref: () => Campus, type: () => ID})
  public campus!: Ref<Campus>

  @Field(() => Mood, { nullable: true })
  @Prop({ ref: () => Mood, type: () => ID})
  public mood!: Ref<Mood>
}

export const UserModel = getModelForClass(User, {
  schemaOptions: { timestamps: true },
});
