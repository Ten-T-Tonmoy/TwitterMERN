import express from "express";
import authroutes from "./routes/auth.routes.js";
import dotenv from "dotenv";
import connectDb from "./db/connect.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use("/api/auth", authroutes);
app.use(express.json());
// console.log(process.env.MONGO_URI);
//reading env files with dotenv

app.listen(PORT, () => {
  console.log("server running bitches");
  connectDb();
});
