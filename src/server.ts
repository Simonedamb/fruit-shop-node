import express from "express";
import "express-async-errors";
import { PrismaClient } from "@prisma/client";
import "dotenv/config";
import {
    validate,
    ValidationErrorMiddleware,
    fruitSchema,
    FruitData,
} from "./lib/validation";

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

const port = process.env.PORT;

app.get("/fruits", async (req, res) => {
    const fruits = await prisma.fruits.findMany();

    res.json(fruits);
});

app.get("/fruits/:id(\\d+)", async (req, res, next) => {
    const fruitId = Number(req.params.id);

    const fruit = await prisma.fruits.findUnique({
        where: { id: fruitId },
    });

    if (!fruit) {
        res.status(404);
        return next(`Cannot GET /fruits/${fruitId}`);
    }

    res.json(fruit);
});

app.post("/fruits", validate({ body: fruitSchema }), async (req, res) => {
    const fruitData: FruitData = req.body;

    const fruit = await prisma.fruits.create({
        //@ts-ignore
        data: fruitData,
    });

    res.status(201).json(fruit);
});

app.put(
    "/fruits/:id(\\d+)",
    validate({ body: fruitSchema }),
    async (request, response, next) => {
        const fruitId = Number(request.params.id);
        const FruitData: FruitData = request.body;
        try {
            const fruit = await prisma.fruits.update({
                where: { id: fruitId },
                data: FruitData,
            });
            response.status(200).json(fruit);
        } catch (error) {
            response.status(404);
            next(`Cannot PUT /fruits/${fruitId}`);
        }
    }
);

app.delete("/fruits/:id(\\d+)", async (request, response, next) => {
    const fruitId = Number(request.params.id);
    try {
        await prisma.fruits.delete({
            where: { id: fruitId },
        });
        response.status(204).end();
    } catch (error) {
        response.status(404);
        next(`Cannot DELETE /fruits/${fruitId}`);
    }
});

app.use(ValidationErrorMiddleware);

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
