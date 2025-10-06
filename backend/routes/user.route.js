import express from "express";
import {
  signup,
  login,
  logout,
  resetPassword,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.post("/resetPassword", resetPassword);

export default router;
