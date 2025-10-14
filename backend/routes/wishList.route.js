import express from "express";
import verifyToken from "../middleware/verifyToken.js";
import {
  getWishlist,
  toggleWishlist,
} from "../controllers/wishList.controller.js";

const router = express.Router();

router.post("/toggle", verifyToken, toggleWishlist);
router.get("/", verifyToken, getWishlist);
export default router;
