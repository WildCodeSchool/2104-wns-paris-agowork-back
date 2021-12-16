import { __EnumValue } from "graphql";
import { registerEnumType } from "type-graphql";

export enum Role {
  SUPERADMIN = "SUPERADMIN",
  ADMIN = "ADMIN",
  TEACHER = "TEACHER",
  STUDENT = "STUDENT",
}

registerEnumType(Role, {
  name: "Role", // this one is mandatory
});
