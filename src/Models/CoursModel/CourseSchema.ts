import { Field, ID, ObjectType } from "type-graphql";
import { Prop, getModelForClass } from "@typegoose/typegoose";

@ObjectType()
export class Course {
    @Field(() => ID)
    id!: string;

    @Field()
    @Prop({ trim: true, required: true })
    courseTitle!: string;

    @Field(() => String, { nullable: true }) 
    @Prop({ trim: true, required: true })
    isValidated?: [String];

    @Field(() => String, { nullable: true }) 
    @Prop({ trim: true, required: true })
    comments?: String;
}

export const CourseModel = getModelForClass(Course, {
    schemaOptions: { timestamps: true },
});