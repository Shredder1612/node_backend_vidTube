import dotenv from "dotenv";
import { app } from "./app.js";
import connectDB from "./db/index.js";

dotenv.config({
  path: "./.env",
  override: true,
})

const PORT = process.env.PORT || 8001

connectDB()
  .then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
  });
  })
  .catch((error) => {
  console.log(`mongoDB connection error`, error);
})
