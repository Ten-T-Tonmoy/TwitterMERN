import express from "express";
import dotenv from "dotenv";
import connectDb from "./db/connect.js";
import cookieParser from "cookie-parser";





import authroutes from "./routes/auth.routes.js";



dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cookieParser());
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));
// console.log(process.env.MONGO_URI);
//reading env files with dotenv
app.use("/api/auth", authroutes);
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log("server running bitches");
  connectDb();
});
