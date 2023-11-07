import express from "express";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import userRouter from "./routes/userRoutes.js"

export const app = express();

app.use(cookieParser());

app.use(express.json());

config({
  path:"./data/config.env"
});

app.use("/user",userRouter)



app.get("/",  (req, res) => {
 res.send("hello");
});






