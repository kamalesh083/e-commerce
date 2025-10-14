import User from "../models/User.js";
import Product from "../models/Product.js";

// Add or remove from wishlist
const toggleWishlist = async (req, res) => {
  try {
    const userId = req.userId; // from auth middleware
    const { productId } = req.body;

    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const index = user.wishList.findIndex((id) => id.toString() === productId);

    if (index > -1) {
      // Remove from wishlist
      user.wishList.splice(index, 1);
      await user.save();
      return res
        .status(200)
        .json({ message: "Removed from wishlist", wishlist: user.wishList });
    } else {
      // Add to wishlist
      user.wishList.push(productId);
      await user.save();
      return res
        .status(200)
        .json({ message: "Added to wishlist", wishlist: user.wishList });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
const getWishlist = async (req, res) => {
  try {
    const userId = req.userId; // from auth middleware
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    // Populate product details
    const user = await User.findById(userId).populate("wishList");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ wishlist: user.wishList });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export { toggleWishlist, getWishlist };
