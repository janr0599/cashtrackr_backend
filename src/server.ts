import express from "express";
import colors from "colors";
import morgan from "morgan";
import { db } from "./config/db";

async function connectDb() {
    try {
        await db.authenticate();
        db.sync();
        console.log(colors.green("Database connected successfully"));
    } catch (error) {
        console.error(colors.red("Database connection failed"), error);
    }
}
connectDb();

const app = express();

app.use(morgan("dev"));

app.use(express.json());

export default app;
