import { Field, ID, ObjectType } from "type-graphql";
import { Prop, getModelForClass } from '@typegoose/typegoose';

@ObjectType()
export class User {
    @Field(() => ID)
    id!: string;

    @Field(() => String)
    @Prop({ trim: true, required: true })
    firstname!: string;
    
    @Field(() => String)
    @Prop({ trim: true, required: true })
    lastname!: string;

    @Field(() => String, {nullable: true})
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
}

export const UserModel = getModelForClass(User, {
    schemaOptions: { timestamps: true },
  });