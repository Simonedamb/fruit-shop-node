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
const multer_1 = require("./lib/middleware/multer");
const index_1 = __importDefault(require("./routes/index"));
const upload = (0, multer_1.initMulterMiddleware)();
const cors_1 = __importDefault(require("cors"));
const prisma = new client_1.PrismaClient();
const corsOptions = {
    origin: "http://localhost:8080",
};
const port = process.env.PORT;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)(corsOptions));
app.use(validation_1.ValidationErrorMiddleware);
app.use(index_1.default);
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
//# sourceMappingURL=server.js.map