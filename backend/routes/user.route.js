import express from "express";
import {
  signup,
  login,
  logout,
  resetPassword,
  checkAuth,
  getUserDetails,
  updateUserDetails,
} from "../controllers/user.controller.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/check-auth", verifyToken, checkAuth);

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.post("/resetPassword", resetPassword);

router.get("/details", verifyToken, getUserDetails);
router.post("/details", verifyToken, updateUserDetails);

export default router;
