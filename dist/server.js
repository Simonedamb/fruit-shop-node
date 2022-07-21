"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const client_1 = require("@prisma/client");
require("dotenv/config");
const validation_1 = require("./lib/validation");
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
app.use(express_1.default.json());
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
app.post("/fruits", (0, validation_1.validate)({ body: validation_1.fruitSchema }), async (req, res) => {
    const fruitData = req.body;
    const fruit = await prisma.fruits.create({
        //@ts-ignore
        data: fruitData,
    });
    res.status(201).json(fruit);
});
app.put("/fruits/:id(\\d+)", (0, validation_1.validate)({ body: validation_1.fruitSchema }), async (request, response, next) => {
    const fruitId = Number(request.params.id);
    const FruitData = request.body;
    try {
        const fruit = await prisma.fruits.update({
            where: { id: fruitId },
            data: FruitData,
        });
        response.status(200).json(fruit);
    }
    catch (error) {
        response.status(404);
        next(`Cannot PUT /fruits/${fruitId}`);
    }
});
app.delete("/fruits/:id(\\d+)", async (request, response, next) => {
    const fruitId = Number(request.params.id);
    try {
        await prisma.fruits.delete({
            where: { id: fruitId },
        });
        response.status(204).end();
    }
    catch (error) {
        response.status(404);
        next(`Cannot DELETE /fruits/${fruitId}`);
    }
});
app.use(validation_1.ValidationErrorMiddleware);
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
//# sourceMappingURL=server.js.map