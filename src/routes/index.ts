import express from "express";
import "express-async-errors";
import { PrismaClient } from "@prisma/client";
import "dotenv/config";
import {
    validate,
    ValidationErrorMiddleware,
    fruitSchema,
    FruitData,
} from "../lib/validation";

import { initMulterMiddleware } from "../lib/middleware/multer";

const router = express.Router();

const prisma = new PrismaClient();

router.get("/fruits", async (req, res) => {
    const fruits = await prisma.fruits.findMany();

    res.json(fruits);
});

router.get("/fruits/:id(\\d+)", async (req, res, next) => {
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

router.post("/fruits", validate({ body: fruitSchema }), async (req, res) => {
    const fruitData: FruitData = req.body;

    const fruit = await prisma.fruits.create({
        //@ts-ignore
        data: fruitData,
    });

    res.status(201).json(fruit);
});

router.put(
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

router.delete("/fruits/:id(\\d+)", async (request, response, next) => {
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

export default router;
