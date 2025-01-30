import User from "../models/user.model.js";
import bcrypt from "bcryptjs"; //for hashing
import { generateTokenAndSetCookie } from "../lib/utils/generateToken.js";

//it checked data uniqueness and hashed pass
export const signUp = async (req, res) => {
  try {
    const { fullname, username, email, password } = req.body;
    const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailReg.test(email)) {
      return res.status(400).json({
        error: "invalid Email Format",
      });
    }
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({
        error: "UserName Taken Already",
      });
    }
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({
        error: "Email Taken Already",
      });
    }

    //hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedpass = await bcrypt.hash(password, salt);

    const newUser = {
      fullname,
      username,
      email,
      password: hashedpass,
    };

    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);
      //res.cookie will get in return
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        fullname: newUser.fullname,
        username: newUser.username,
        email: newUser.email,
        follower: newUser.follower,
        following: newUser.following,
        profileImg: newUser.profileImg,
        coverImg: newUser.coverImg,
      });
    }
  } catch (error) {
    console.error("Signing up Error Occured ", error);
    res.send(400).json({
      error: "invalid user data",
    });
  }
};

export const login = (req, res) => {
  res.send("Look who came to log in");
};

export const logout = (req, res) => {
  res.json({
    data: "Look who did log out",
  });
};
