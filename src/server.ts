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

import { initMulterMiddleware } from "./lib/middleware/multer";

import generalRouter from "./routes/index";

const upload = initMulterMiddleware();

import cors from "cors";

const prisma = new PrismaClient();

const corsOptions = {
    origin: "http://localhost:8080",
};

const port = process.env.PORT;

const app = express();

app.use(express.json());

app.use(cors(corsOptions));

app.use(ValidationErrorMiddleware);

app.use(generalRouter);

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
