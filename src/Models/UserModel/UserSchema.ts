import { Field, ID, ObjectType, registerEnumType } from "type-graphql";
import { Prop, getModelForClass } from '@typegoose/typegoose';
import { GraphQLEnumType, __EnumValue } from "graphql";

export enum Role {
    ADMIN = 'ADMIN',
    TEACHER = 'TEACHER',
    STUDENT = 'STUDENT',
}

registerEnumType(Role, {
    name: "Role", // this one is mandatory
});

@ObjectType()
export class User {
    @Field(() => ID)
    id!: string;

    @Field(() => String)
    @Prop({ required: false })
    token!: string;

    @Field(() => Role)
    @Prop({ enum: Role })
    role!: Role;

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