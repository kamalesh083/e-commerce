import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const verifyToken = (req, res, next) => {
  const token = req.cookies?.token; // get token from cookie
  if (!token) {
    return res.status(401).json({ message: "Unauthorized - No token" });
  }

  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET not set in environment variables");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId; // match the key used in generateAccessToken
    next();
  } catch (error) {
    console.error("JWT Error:", error.message);
    return res.status(401).json({ message: "Unauthorized - Invalid token" });
  }
};

export default verifyToken;
