import { Field, ID, ObjectType } from "type-graphql";
import {
  Prop,
  getModelForClass,
  setGlobalOptions,
  Severity,
  Ref,
} from "@typegoose/typegoose";
import { Role } from "./role.enum";
import { Mood } from "./mood.enum";
import { Campus } from "../campusModel/campus.schema";

setGlobalOptions({ options: { allowMixed: Severity.ALLOW } });
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
  @Prop({ enum: Role, type: String })
  role!: Role;

  @Field(() => Mood)
  @Prop({ enum: Mood, type: String })
  mood!: Mood;

  @Field()
  @Prop({ trim: true, required: true })
  firstname!: string;

  @Field()
  @Prop({ trim: true, required: true })
  lastname!: string;

  @Field()
  @Prop({ trim: true, required: true })
  email!: string;

  @Prop({ trim: true, required: true })
  password!: string;

  @Field(() => String, { nullable: true })
  @Prop({ trim: true, required: false })
  town?: string;

  @Field(() => String, { nullable: true })
  @Prop({ trim: true, required: false })
  picture?: string;

  @Prop({ ref: () => Campus })
  public campus!: Ref<Campus>;
}

export const UserModel = getModelForClass(User, {
  schemaOptions: { timestamps: true },
});
