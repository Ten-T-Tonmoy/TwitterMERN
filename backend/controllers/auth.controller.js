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

    const newUser = new User({
      fullname,
      username,
      email,
      password: hashedpass,
    });
    //without new User mongoose funcs cant be added

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
    res.status(400).json({
      error: "invalid user data",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    //?optional chaning to return undefined if null
    const passCorrect = await bcrypt.compare(password, user?.password || "");
    // ||"" must since it might be any of use
    if (!user || !passCorrect) {
      return res.status(400).json({
        error: "invalid credentials",
      });
    }

    generateTokenAndSetCookie(user._id, res);

    res.status(201).json({
      _id: user._id,
      fullname: user.fullname,
      username: user.username,
      email: user.email,
      follower: user.follower,
      following: user.following,
      profileImg: user.profileImg,
      coverImg: user.coverImg,
    });
  } catch (error) {
    console.error("Signing in Error Occured ", error);
    return res.status(400).json({
      error: "invalid user data",
    });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({
      message: "Logget out Done",
    });
  } catch (error) {
    console.error("Signing out controller error ", error);
    return res.status(500).json({
      error: "Error occured while logging out",
    });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.status(200).json(user);
  } catch (error) {
    console.log(" getUser controller Error", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
