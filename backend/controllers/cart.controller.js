import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

const getCartItems = async (req, res) => {
  try {
    const userId = req.userId;
    const cart = await Cart.findOne({ userId }).populate("items.productId");

    if (!cart) return res.status(200).json({ items: [], totalPrice: 0 });

    res.status(200).json({
      items: cart.items.map((item) => ({
        _id: item._id,
        productId: item.productId, // now frontend can use item.product.imageUrl etc.
        quantity: item.quantity,
      })),
      totalPrice: cart.totalPrice,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const addItemToCart = async (req, res) => {
  try {
    // Get userId from auth middleware
    const userId = req.userId; // Make sure your auth middleware sets this
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized - No userId" });
    }

    const { productId, quantity } = req.body;
    if (!productId || !quantity) {
      return res
        .status(400)
        .json({ message: "productId and quantity required" });
    }

    // Validate product exists
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Find cart
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // Create new cart
      cart = new Cart({
        userId,
        items: [{ productId, quantity }],
        totalPrice: product.price * quantity,
      });
    } else {
      // Ensure items array exists
      if (!cart.items) cart.items = [];

      // Check if product already in cart
      const itemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (itemIndex > -1) {
        // Increase quantity
        cart.items[itemIndex].quantity += quantity;
      } else {
        // Add new product
        cart.items.push({ productId, quantity });
      }

      // Recalculate totalPrice
      cart.totalPrice = 0;
      for (let item of cart.items) {
        const prod = await Product.findById(item.productId);
        cart.totalPrice += prod.price * item.quantity;
      }
    }

    await cart.save();
    await cart.populate("items.productId");
    res.status(200).json({ message: "Product added to cart", cart });
  } catch (error) {
    console.error("❌ Add to Cart Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateCartItem = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId } = req.params;
    const { quantity } = req.body;

    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex === -1)
      return res.status(404).json({ message: "Item not found in cart" });

    cart.items[itemIndex].quantity = quantity;

    // Recalculate totalPrice
    cart.totalPrice = 0;
    for (let item of cart.items) {
      const prod = await Product.findById(item.productId);
      cart.totalPrice += prod.price * item.quantity;
    }

    await cart.save();

    res.status(200).json({ message: "Cart updated", cart });
  } catch (err) {
    console.error("❌ Update Cart Item Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const deleteCartItem = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId } = req.params; // make sure router uses /:productId

    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    // Remove the item safely
    cart.items = cart.items.filter((item) => {
      const id = item.productId._id
        ? item.productId._id.toString()
        : item.productId.toString();
      return id !== productId;
    });

    // Recalculate total price
    cart.totalPrice = 0;
    for (let item of cart.items) {
      const prod = await Product.findById(item.productId._id || item.productId);
      cart.totalPrice += prod.price * item.quantity;
    }

    await cart.save();
    await cart.populate("items.productId");

    res.status(200).json({ message: "Item removed from cart", cart });
  } catch (err) {
    console.error("❌ Remove Cart Item Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
const clearCart = async (req, res) => {
  try {
    const userId = req.userId;

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      // If no cart exists, return empty cart instead of 404
      return res.status(200).json({
        message: "Cart cleared successfully",
        cart: { items: [], totalPrice: 0 },
      });
    }

    cart.items = [];
    cart.totalPrice = 0;
    await cart.save();

    res.status(200).json({
      message: "Cart cleared successfully",
      cart: { items: [], totalPrice: 0 },
    });
  } catch (err) {
    console.error("❌ Clear Cart Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export {
  getCartItems,
  addItemToCart,
  updateCartItem,
  deleteCartItem,
  clearCart,
};
