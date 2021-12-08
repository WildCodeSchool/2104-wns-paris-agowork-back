import { __EnumValue } from "graphql";
import { registerEnumType } from "type-graphql";

export enum IsValidated {
    TRUE = 'TRUE',
    FALSE = 'FALSE',
    INPROGRESS = 'INPROGRESS',
}

registerEnumType(IsValidated, {
    name: "IsValidated", // this one is mandatory
});