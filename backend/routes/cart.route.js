import express from "express";
import {
  getCartItems,
  addItemToCart,
  updateCartItem,
  deleteCartItem,
  clearCart,
} from "../controllers/cart.controller.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", verifyToken, getCartItems);
router.post("/add", verifyToken, addItemToCart);
router.put("/:id", verifyToken, updateCartItem);
router.delete("/clear", verifyToken, clearCart);
router.delete("/:productId", verifyToken, deleteCartItem);

export default router;
