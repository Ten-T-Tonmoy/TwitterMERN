import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import {
  followOrUnfollow,
  suggestedUsers,
  userProfile,
  userUpdate,
} from "../controllers/user.controller.js";

const Router = express.Router();

Router.get("/profile/:username", protectRoute, userProfile);
Router.get("/suggested", protectRoute, suggestedUsers);
Router.post("/follow/:id", protectRoute, followOrUnfollow);
Router.post("/update", protectRoute, userUpdate);

export default Router;
