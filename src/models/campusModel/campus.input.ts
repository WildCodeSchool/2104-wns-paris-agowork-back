import { Field, InputType } from "type-graphql";
import { Campus } from "./campus.schema";

@InputType()
export class CampusInput implements Partial<Campus> {
  @Field({ nullable: false })
  name!: string;

  @Field()
  address!: string;

  @Field()
  number!: string;
}
