import mongoose from "mongoose";

export const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "Backend",
    })
    .then((c) => {
      console.log(`db is connected at host ${c.connection.host}`);
    })
    .catch((e) => console.log(e));
};
