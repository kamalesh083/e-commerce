import express from "express";
import {
  signup,
  login,
  logout,
  resetPassword,
  getCurrentUser,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.post("/resetPassword", resetPassword);

router.get("/me", getCurrentUser);

export default router;
