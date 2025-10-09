import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const generateAccessToken = (res, userId) => {
  if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET not set");

  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: false, // force false in development
    sameSite: "lax", // okay for localhost
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return token;
};

export default generateAccessToken;
