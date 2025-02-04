import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import {
  allPosts,
  commentOnPost,
  createPost,
  deletePost,
  followingPosts,
  likedPosts,
  likeOrUnlikePost,
  userPosts,
} from "../controllers/post.Controller.js";

const Router = express.Router();

Router.get("/all", protectRoute, allPosts);
Router.get("/following", protectRoute, followingPosts);
Router.get("/liked/:id", protectRoute, likedPosts);
Router.get("/user/:username", protectRoute, userPosts);
Router.post("/create", protectRoute, createPost);
Router.post("/like/:id", protectRoute, likeOrUnlikePost);
Router.post("/comment/:id", protectRoute, commentOnPost);
Router.delete("/:id", protectRoute, deletePost);

export default Router;
