import User from "../models/user.model.js";
import bcrypt from "bcryptjs";//for hashing

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
  } catch (error) {
    console.error("Signing up Error Occured ", error);
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
