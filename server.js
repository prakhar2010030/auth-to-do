import {app} from "./app.js"
import { connectDB } from "./data/connection.js";

connectDB();

app.listen(process.env.PORT, () => {
    console.log(`server is running at ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
  });
  