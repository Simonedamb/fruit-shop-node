import { Static, Type } from "@sinclair/typebox";

export const fruitSchema = Type.Object(
    {
        name: Type.String(),
        genus: Type.Optional(Type.String()),
        image: Type.String(),
        price: Type.Number(),
        family: Type.Optional(Type.String()),
        order: Type.String(),
    },
    { additionalProperties: false }
);
export type FruitData = Static<typeof fruitSchema>;
