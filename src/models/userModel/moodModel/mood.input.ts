import { Field, InputType } from "type-graphql";
import { Mood } from "./mood.schema";

@InputType()
export class MoodInput implements Partial<Mood> {
  @Field({ nullable: false })
  name!: string;

  @Field({ nullable: false })
  icon!: string;
}
