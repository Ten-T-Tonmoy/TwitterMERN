import Notification from "../models/notification.model";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";

export const allPosts = (req, res) => {
  try {
  } catch (error) {
    console.log("allPosts Controller error occured", error);
    res.status(500).json({
      error: error.message,
    });
  }
};
export const followingPosts = (req, res) => {
  try {
  } catch (error) {
    console.log("followingPosts Controller error occured", error);
    res.status(500).json({
      error: error.message,
    });
  }
};
export const likedPosts = (req, res) => {
  try {
  } catch (error) {
    console.log("likedPosts Controller error occured", error);
    res.status(500).json({
      error: error.message,
    });
  }
};
export const userPosts = (req, res) => {
  try {
  } catch (error) {
    console.log("userPosts Controller error occured", error);
    res.status(500).json({
      error: error.message,
    });
  }
};

//----------------------- create post ---------------------

export const createPost = async (req, res) => {
  try {
    const { text } = req.body;
    let { img } = req.body;
    const posterId = req.user._id.toString();
    // always convert id into string?

    const PosterUser = await User.findById(posterId);

    if (!PosterUser) {
      return res.status(404).json({
        message: "User not found on db?",
      });
    }
    if (!text && !img) {
      return res.status(400).json({
        message: "Cmon man posts cant be all blank",
      });
    }

    //perform cloudinary upload shit here

    if (img) {
    }

    const newPost = new Post({
      user: posterId,
      text,
      img,
    });

    await newPost.save();
    res.status(201).json({
      newPost,
    });
  } catch (error) {
    console.log("createPost Controller error occured", error);
    res.status(500).json({
      error: error.message,
    });
  }
};
export const likeOrUnlikePost = (req, res) => {
  try {
  } catch (error) {
    console.log("likeOrUnlikePost Controller error occured", error);
    res.status(500).json({
      error: error.message,
    });
  }
};
export const commentOnPost = (req, res) => {
  try {
  } catch (error) {
    console.log("commentOnPost Controller error occured", error);
    res.status(500).json({
      error: error.message,
    });
  }
};
export const deletePost = (req, res) => {
  try {
  } catch (error) {
    console.log("deletePost Controller error occured", error);
    res.status(500).json({
      error: error.message,
    });
  }
};
