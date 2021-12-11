import { Field, ID, ObjectType } from "type-graphql";
import { Prop, getModelForClass, Ref } from "@typegoose/typegoose";
import { User } from "../userModel/user.schema";

@ObjectType()
export class Campus {
  @Field(() => ID)
  id!: string;

  @Field()
  @Prop({ unique: true, required: true })
  name!: string;

  @Field()
  @Prop({ required: false })
  address!: string;

  @Field()
  @Prop({ required: false })
  phone!: string;
}

export const CampusModel = getModelForClass(Campus, {
  schemaOptions: { timestamps: true },
});
