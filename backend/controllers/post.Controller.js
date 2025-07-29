import Notification from "../models/notification.model.js";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import { v2 as cloudinary } from "cloudinary";

//---------------------------- all Posts -------------------------------------

export const allPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate({ path: "user", select: "-password" })
      .populate({ path: "comments.user", select: "-password" });

    if (posts.length === 0) {
      return res.status(200).json([]);
    }
    res.status(200).json(posts);
  } catch (error) {
    console.log("allPosts Controller error occured", error);
    res.status(500).json({
      error: error.message,
    });
  }
};

//------------------- Following Posts -----------------------
//own posts? misleading!
export const followingPosts = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        message: "User not found on db?",
      });
    }
    const following = user.following;
    //find all that included current users following ID(which is ref to user)
    //.populate will fetch those ref users just pick posts from them
    const postFeed = await Post.find({ user: { $in: following } })
      .sort({
        createdAt: -1,
      })
      .populate({
        path: "user", //user field of the model be aware
        select: "-password",
      })
      .populate({
        path: "comments.user",
        select: "-password",
      });
    //populating till user just to make those more accesible?!
    res.status(200).json(postFeed);
  } catch (error) {
    console.log("followingPosts Controller error occured", error);
    res.status(500).json({
      error: error.message,
    });
  }
};

//----------------------------- liked posts --------------------------------------
//id of target will be given
export const likedPosts = async (req, res) => {
  const targetId = req.params.id;
  try {
    const targetUser = await User.findById(targetId);
    if (!targetUser) {
      return res.status(404).json({
        error: "User not found",
      });
    }
    //posts _id can be find in TargetUsers likedposts which is a id array of Posts
    const likedPosts = await Post.find({
      _id: { $in: targetUser.likedPosts },
    })
      .populate({
        path: "user",
        select: "-password",
      })
      .populate({
        path: "comments.user",
        select: "-password",
      });

    //

    res.status(200).json(likedPosts);
  } catch (error) {
    console.log("likedPosts Controller error occured", error);
    res.status(500).json({
      error: error.message,
    });
  }
};

//------------------------- USer Posts -----------------------
//username provided?

export const userPosts = async (req, res) => {
  try {
    const targetUser = await User.findOne({ username: req.params.username });
    if (!targetUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    const userPosts = await Post.find({ user: targetUser._id })
      .sort({ createdAt: -1 }) //icymi newer first
      .populate({
        path: "user",
        select: "-password",
      })
      .populate({
        path: "comments.user",
        select: "-password",
      });

    res.status(200).json(userPosts);
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
      const imgUploadResponse = await cloudinary.uploader.upload(img);
      img = imgUploadResponse.secure_url;
    }

    const newPost = new Post({
      user: posterId,
      text,
      img,
    });

    await newPost.save();
    res.status(201).json({
      success: true,
      newPost,
    });
  } catch (error) {
    console.log("createPost Controller error occured", error);
    res.status(500).json({
      error: error.message,
    });
  }
};

//--------------------------- like/unlike post -------------------------

export const likeOrUnlikePost = async (req, res) => {
  try {
    const likerId = req.user._id;
    const { id: targetPostId } = req.params;

    const targetPost = await Post.findById(targetPostId);

    if (!targetPost) {
      return res.status(404).json({
        message: "Post to like not found",
      });
    }
    const isLiked = targetPost.likes.includes(likerId);

    //handling the liking or remove liking portion

    if (isLiked) {
      await Post.updateOne(
        { _id: targetPostId },
        { $pull: { likes: likerId } }
      );
      await User.updateOne(
        { _id: likerId },
        { $pull: { likedPosts: targetPostId } }
      );

      //ps targetPost isnt updated
    } else {
      //targetPost.likes.push(likedId) also works

      await Post.updateOne(
        { _id: targetPostId },
        { $push: { likes: likerId } }
      );
      await User.updateOne(
        { _id: likerId },
        { $push: { likedPosts: targetPostId } }
      );
      const likeNotif = new Notification({
        from: likerId,
        to: targetPost.user,
        type: "like",
      });

      await likeNotif.save();
    }
    //better than filtering fetch again
    const updatedPost = await Post.findById(targetPostId);
    res.status(200).json(updatedPost.likes);
  } catch (error) {
    console.log("likeOrUnlikePost Controller error occured", error);
    res.status(500).json({
      error: error.message,
    });
  }
};

//--------------------------------- Commenting ------------------------------
export const commentOnPost = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({
        error: "Comments cant be blank",
      });
    }
    const targetPost = await Post.findById(req.params.id);
    if (!targetPost) {
      return res.status(404).json({
        error: "Post Not Found",
      });
    }
    //
    const commentorId = req.user._id;

    const comment = { user: commentorId, text };
    targetPost.comments.push(comment);

    await targetPost.save();

    res.status(200).json(targetPost);
  } catch (error) {
    console.log("commentOnPost Controller error occured", error);
    res.status(500).json({
      error: error.message,
    });
  }
};

//--------------------- Delete Post ---------------------

export const deletePost = async (req, res) => {
  try {
    //will provide id of post?
    const targetPost = await Post.findById(req.params.id);

    if (!targetPost) {
      return res.status(404).json({
        message: "Post not found on db?",
      });
    }
    if (targetPost.user.toString() !== req.user._id.toString()) {
      return res.status(400).json({
        error: "Not Authorized to delete this man",
      });
    }

    //another cloudinary shit
    //https://res.cloudinary.com/demo/image/upload/v1699346578/uploads/sample-image.jpg
    /*
      splits it on every / and makes an array 
      .pop()=>gets the last ele again splits on 
      dot and takes first element meaning the name
    */
    if (targetPost.img) {
      const imageId = targetPost.img.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(imageId);
    }

    await Post.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Post deleting done",
    });
  } catch (error) {
    console.log("deletePost Controller error occured", error);
    res.status(500).json({
      error: error.message,
    });
  }
};
