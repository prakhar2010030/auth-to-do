import mongoose from "mongoose";

export const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "Backend",
    })
    .then(() => {
      console.log("db is connected");
    })
    .catch((e) => console.log(e));
};
