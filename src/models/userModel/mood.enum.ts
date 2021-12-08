import { __EnumValue } from "graphql";
import { registerEnumType } from "type-graphql";

export enum Mood {
    GREAT = 'GREAT',
    GOOD = 'GOOD',
    OK = 'OK',
    NOTGOOD = 'NOTGOOD',
}

registerEnumType(Mood, {
    name: "Mood", // this one is mandatory
});
