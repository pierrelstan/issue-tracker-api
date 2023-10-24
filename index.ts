import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import morgan from "morgan";
import cookieParser from "cookie-parser";

import userRouter from "./src/routes/user.routes";
import projectRouter from "./src/routes/project.routes";
import ticketRouter from "./src/routes/ticket.routes";
import connectToPusher from "./src/utils/Pusher";

const app = express();

const pusher = connectToPusher();
const pusherChannel = "issue-tracker-api-pusher";

app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.options("*", cors());
app.use(morgan("dev"));
app.use(cookieParser());

/** Rules of our API */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.options("*", cors());

app.get("/", (req, res) => {
    res.send("Welcome to the Bug Tracker API!");
});

// app.use("/api/v1", routes);
app.use("/api/users", userRouter);
app.use("/api/projects", projectRouter);

app.use("/api/tickets", ticketRouter);

/** Error handling */
app.use((req, res, next) => {
    const error = new Error("Not found");
    res.status(404).json({
        message: `error ${error.message}`,
    });
});

mongoose
    .connect(process.env.MONGODB_API_KEY, { retryWrites: true, w: "majority" })
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("Successfully connected to MONGODB ATLAS!");
            console.log("Port:", process.env.PORT.toString());
        });
    })
    .catch((error) => {
        console.log("Unable to connect to MONGODB ATLAS!");
        console.log("\nError connecting to MongoDB...");
    });

export { pusher, pusherChannel, app };
