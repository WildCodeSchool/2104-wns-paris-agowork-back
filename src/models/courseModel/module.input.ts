import { Field, InputType } from "type-graphql";
import { Length } from "class-validator";
import { Module } from "./module.schema";
import CourseInput from "./course.input";

@InputType()
export default class ModuleInput implements Partial<Module> {
  @Field(() => String)
  @Length(1, 255)
  title!: string;

  @Field(() => String)
  @Length(1, 255)
  comments?: string;

  @Field(() => [CourseInput])
  courses?: CourseInput[];
}
