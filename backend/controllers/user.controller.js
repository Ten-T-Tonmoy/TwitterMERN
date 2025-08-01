import bcrypt from "bcryptjs";

import Notification from "../models/notification.model.js";
import User from "../models/user.model.js";

//------------------------------Show Profile--------------------------------------
export const userProfile = async (req, res) => {
  try {
    const { username } = req.params;
    const usertoShow = await User.findOne({ username }).select("-password");
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

//------------------------------------ Follow/Unfollow -------------------------------------

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

      return res.status(200).json({ message: "User unfollowed successfully" });
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

      return res.status(200).json({ message: "User followed successfully" });
    }
  } catch (error) {
    console.log("follow/unfollow error controller", error.message);
    res.status(500).json({
      error: error.message,
    });
  }
};

//-------------------------------Suggested Users --------------------------------------

export const suggestedUsers = async (req, res) => {
  try {
    const userId = req.user._id;
    const usersFollowedByMe = await User.findById(userId).select("following");
    //gotta learn aggregate pipelines for this shit
    //
  } catch (error) {
    console.log("suggestedUsers error controller", error.message);
    res.status(500).json({
      error: error.message,
    });
  }
};

//----------------------- update User -------------------------------

export const userUpdate = async (req, res) => {
  const { fullname, email, username, currentPassword, newPassword, bio, link } =
    req.body;

  let { profileImg, coverImg } = req.body;
  const userToUpdateId = req.user._id;
  try {
    let userToUpdate = await User.findById(userToUpdateId);

    if (!userToUpdate) {
      return res.status(404).json({ message: "user Not Found" });
    }
    if (
      (!newPassword && currentPassword) ||
      (newPassword && !currentPassword)
    ) {
      return res.status(400).json({ message: "Fill both password fields" });
    }
    if (currentPassword && newPassword) {
      const isMatched = await bcrypt.compare(
        currentPassword,
        userToUpdate.password
      );
      if (!isMatched) {
        return res.status(400).json({
          message: "wrong password. Please Provide correct passowrd.",
        });
      }
      if (newPassword.length < 6) {
        return res
          .status(400)
          .json({ message: "password must be 6 char long" });
      }
      const salt = await bcrypt.genSalt(10);
      userToUpdate.password = await bcrypt.hash(newPassword, salt);
    }

    //cloudinary to upload and manage images!?

    //fix this later
    if (coverImg) {
      if (userToUpdate.coverImg) {
      }
    }

    userToUpdate.fullname = fullname || userToUpdate.fullname;
    userToUpdate.username = username || userToUpdate.username;
    userToUpdate.email = email || userToUpdate.email;
    userToUpdate.bio = bio || userToUpdate.bio;
    userToUpdate.link = link || userToUpdate.link;
    userToUpdate.profileImg = profileImg || userToUpdate.profileImg;
    userToUpdate.coverImg = coverImg || userToUpdate.coverImg;

    userToUpdate = await userToUpdate.save();

    //null set for safety
    userToUpdate.password = undefined; //better than null

    return res.status(200).json(userToUpdate);
  } catch (error) {
    console.log("user Updater error controller", error.message);
    res.status(500).json({
      error: error.message,
    });
  }
};
