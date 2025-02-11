import express from "express";
import {
  signUp,
  login,
  logout,
  getUser,
} from "../controllers/auth.controller.js";

import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", protectRoute, getUser); //for profile

export default router;
