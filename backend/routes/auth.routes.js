import express from "express";
import {
  signUp,
  login,
  logout,
  getUser,
} from "../controllers/auth.controller.js";
const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", getUser); //for profile

export default router;
