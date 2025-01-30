import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });
  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 100, //miliseconds
    httpOnly: true, //only http accesible
    sameSite: "strict",
    secure: false,
    // secure: process.env.NODE_END !== "development", //true if this isnt development
  });
};
