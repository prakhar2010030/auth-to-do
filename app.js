import express from "express";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import userRouter from "./routes/userRoutes.js";
import taskRouter from "./routes/taskRoute.js";
import { errorMiddleware } from "./middlewares/error.js";

export const app = express();

app.use(cookieParser());

app.use(express.json());

config({
  path: "./data/config.env",
});

app.use("/api/user", userRouter);
app.use("/api/task", taskRouter);

app.get("/", (req, res) => {
  res.send("hello");
});

//error handler middleware
app.use(errorMiddleware);
