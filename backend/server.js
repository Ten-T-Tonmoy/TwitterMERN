import express from "express";
import dotenv from "dotenv";
import connectDb from "./db/connect.js";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/post.routes.js";
import notifRoutes from "./routes/notification.routes.js";

dotenv.config();



//static dir shiits latre?

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: ["http://localhost:3000", process.env.FE_URL],
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
app.get("/test", (req, res) => {
  res.status(200).json({
    message: "Backend Working fine",
  });
});

app.listen(PORT, () => {
  console.log("server running bitches");
  connectDb();
});
