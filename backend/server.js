import express from "express";
import dotenv from "dotenv";
import connectDb from "./db/connect.js";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/post.routes.js";
import notifRoutes from "./routes/notification.routes.js";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//static dir shiits latre?

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.FE_URL || "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));
// console.log(process.env.MONGO_URI);
//reading env files with dotenv

//-------------------------- Route Handler ----------------------------------

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/notifications", notifRoutes);

app.listen(PORT, () => {
  console.log("server running bitches");
  connectDb();
});
