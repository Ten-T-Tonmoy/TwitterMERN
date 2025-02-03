import bcrypt from "bcryptjs";

import Notification from "../models/notification.model.js";
import User from "../models/user.model.js";

export const userProfile = (req, res) => {
  try {
    const { username } = req.params;
    const usertoShow = User.findOne({ username }).select("-password");
    if (!usertoShow) {
      return res.status(404).json({
        error: "username wrong given",
      });
    }
    res.status(200).json(usertoShow);
  } catch (error) {
    console.log("userProfile controller error", error.message);
    res.status(500).json({
      error: error.message,
    });
  }
};

export const followOrUnfollow = async (req, res) => {
  try {
    // /:id that i will follow or un?

    const { id } = req.params;
    const userToFollowOrUnfollow = await User.findById(id);
    const currentUser = await User.findById(req.user._id);
    if (!userToFollowOrUnfollow || !currentUser) {
      return res.status(400).json({
        error: "invalid user follow request",
      });
    }
    if (id === req.user._id.toString) {
      return res.status(400).json({
        error: "why  would u follow urself du uh",
      });
    }
    const isFollowing = currentUser.following.includes(id);
    if (isFollowing) {
      //unfollow !! pull removes where push adds stuffs
      await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } });
      //updating following and followers
      await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } });

      res.status(200).json({ message: "User unfollowed successfully" });
    } else {
      //follow

      await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } });
      //updating following and followers
      await User.findByIdAndUpdate(req.user._id, { $push: { following: id } });

      const newNotif = new Notification({
        type: "follow",
        from: req.user._id,
        to: userToFollowOrUnfollow._id,
        //id was usable bt mongoose expects objectId bt id is string
        //will work anyways since it will explicitly convert that shit
      });

      await newNotif.save();

      res.status(200).json({ message: "User followed successfully" });
    }
  } catch (error) {
    console.log("follow/unfollow error controller", error.message);
    res.status(500).json({
      error: error.message,
    });
  }
};

export const suggestedUsers = (req, res) => {
  try {
  } catch (error) {
    console.log("suggestedUsers error controller", error.message);
    res.status(500).json({
      error: error.message,
    });
  }
};

export const userUpdate = (req, res) => {
  try {
  } catch (error) {
    console.log("user Updater error controller", error.message);
    res.status(500).json({
      error: error.message,
    });
  }
};
