import { Field, InputType } from "type-graphql";
import { Length } from "class-validator";
import { Course } from "./CourseSchema";

@InputType()
export default class CourseInput implements Partial<Course>{

    @Field(() => String)
    @Length(1, 255)
    courseTitle!: string;

    @Field(() => String)
    @Length(1, 255)
    isValidated!: [string];

    @Field(() => String)
    @Length(1, 255)
    content!: string;
}