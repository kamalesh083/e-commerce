import express from "express";
import {
  getAllCartItems,
  getCartItemById,
  addItemToCart,
  updateCartItem,
  deleteCartItem,
  clearCart,
} from "../controllers/cart.controller.js";

const router = express.Router();

router.get("/", getAllCartItems);
router.get("/:id", getCartItemById);
router.post("/", addItemToCart);
router.put("/:id", updateCartItem);
router.delete("/:id", deleteCartItem);
router.delete("/", clearCart);

export default router;
