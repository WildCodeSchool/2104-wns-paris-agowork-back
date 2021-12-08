import { Field, ID, ObjectType } from "type-graphql";
import { Prop, getModelForClass } from "@typegoose/typegoose";
import { IsValidated } from "./achievment.enum";

@ObjectType()
export class Course {
    @Field(() => ID)
    id!: string;

    @Field()
    @Prop({ trim: true, required: true })
    courseTitle!: string;

    @Field(() => IsValidated)
    @Prop({ enum: IsValidated, type: String })
    role!: IsValidated;

    @Field(() => String, { nullable: true }) 
    @Prop({ trim: true, required: true })
    content!: String;
}

export const CourseModel = getModelForClass(Course, {
    schemaOptions: { timestamps: true },
});