import express from "express";
import "express-async-errors";
import "dotenv/config";

const app = express();
app.get("/", (request, response) => {
    response.send("Up and running!");
});
const port = process.env.PORT;

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
