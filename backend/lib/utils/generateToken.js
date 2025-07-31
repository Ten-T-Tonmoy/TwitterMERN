import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    //when extracting use the same param name
    expiresIn: "15d",
  });
  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1009, //miliseconds
    httpOnly: true, //only http accesible
    sameSite: "none", //fk this it took me hours to figure out what went wrong on cors
    secure: true,
    // secure: process.env.NODE_END !== "development", //true if this isnt development
  });
};
