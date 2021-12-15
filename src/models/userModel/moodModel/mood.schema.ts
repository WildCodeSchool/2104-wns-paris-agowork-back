import { Field, ID, ObjectType } from "type-graphql";
import {
  Prop,
  getModelForClass,
} from "@typegoose/typegoose";

@ObjectType()
export class Mood {
  @Field(() => ID)
  id!: string;

  @Field(() => String, { nullable: false })
  @Prop({ required: true })
  name!: string;

  @Field(() => String, { nullable: false })
  @Prop({ required: true })
  icon!: string;
}

export const MoodModel = getModelForClass(Mood, {
  schemaOptions: { timestamps: true },
});
