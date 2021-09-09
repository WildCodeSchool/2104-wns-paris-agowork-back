import { Field, ID, ObjectType } from "type-graphql";
import { Prop, getModelForClass, Ref } from "@typegoose/typegoose";
import { Course } from "./CourseSchema";

@ObjectType()
export class Modules {
    @Field(() => ID)
    id!: string;

    @Field()
    @Prop({ trim: true, required: true })
    title!: string;

    @Field(() => String, { nullable: true }) 
    @Prop({ trim: true, required: true })
    comments?: String;

    @Field(() => String, { nullable: true })
    @Prop({ trim: true, required: true })
    course?: Ref<Course>[];
}

export const ModulesModel = getModelForClass(Modules, {
    schemaOptions: { timestamps: true },
});