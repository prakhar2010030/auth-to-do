import express from "express";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import userRouter from "./routes/userRoutes.js";
import taskRouter from "./routes/taskRoute.js";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";
export const app = express();

app.use(cookieParser());

app.use(express.json());

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true, //so that cookie gets to client side
  })
);

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
