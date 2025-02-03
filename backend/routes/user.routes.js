import express from "express";
import protectRoute from "../middleware/protectRoute";
import {
  follorOrUnfollow,
  suggestedUsers,
  userProfile,
  userUpdate,
} from "../controllers/user.controller";

const Router = express.Router();

Router.get("/profile/:username", protectRoute, userProfile);
Router.get("/suggested", protectRoute, suggestedUsers);
Router.post("/follow/:id", protectRoute, follorOrUnfollow);
Router.post("/update", protectRoute, userUpdate);

export default Router;
