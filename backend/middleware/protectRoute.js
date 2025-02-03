import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token)
      return res.status(401).json({
        error: "unauthorized token not found",
      });
    //ps small misunderestand it contains id tho
    const decodedUserId = json.verify(token, process.env.JWT_SECRET);
    if (!decodedUserId) {
      res.status(401).json({
        error: "unauthorized token not matched",
      });
    }
    const decodedUser = await User.findById(decodedUserId.userId).select(
      "-password"
    );

    if (!decodedUser) {
      res.status(401).json({
        error: "user not found!",
      });
    }

    req.user = decodedUser;
    next();
    //
  } catch (e) {
    console.log("protectRoute authenticating Error", e.message);
    // no need for return bt for only res.status i might need to return incase i wanna terminate
    res.status(500).json({
      error: "internal server error authenticating",
    });
  }
};

export default protectRoute;
