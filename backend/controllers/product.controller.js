import Product from "../models/Product.js";

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error("❌ Get Products Error:", error);
    res.status(500).json({
      message: "Server error during fetching products",
      error: error.message,
    });
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("❌ Get Product Error:", error);
    res.status(500).json({
      message: "Server error during fetching product",
      error: error.message,
    });
  }
};

const addProduct = async (req, res) => {
  try {
    const { name, category, tags, stock, price, image } = req.body;
    if (!name || !category || !tags || !stock || !price) {
      return res.status(400).json({ message: "All fields are required" });
    }
    let processedTags = tags;
    if (typeof tags === "string") {
      processedTags = tags.split(",").map((tag) => tag.trim());
    }

    const newProduct = new Product({
      name,
      category,
      tags: processedTags,
      price,
      stock,
      imageUrl: image,
    });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("❌ Add Product Error:", error);
    res.status(500).json({
      message: "Server error during adding product",
      error: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, category, tags, stock, price, imageUrl } = req.body;
  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (name) product.name = name;
    if (category) product.category = category;
    if (tags) product.tags = tags;
    if (stock) product.stock = stock;
    if (price) product.price = price;
    if (imageUrl) product.imageUrl = imageUrl;

    const updatedProduct = await product.save();

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("❌ Update Product Error:", error);
    res.status(500).json({
      message: "Server error during updating product",
      error: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    await Product.findByIdAndDelete(id);

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("❌ Delete Product Error:", error);
    res.status(500).json({
      message: "Server error during deleting product",
      error: error.message,
    });
  }
};

const searchProducts = async (req, res) => {
  const { q } = req.query;

  try {
    if (!q) {
      // If no query, return all products from the DB
      const allProducts = await Product.find();
      return res.status(200).json(allProducts);
    }

    // Search by name or tags (case-insensitive)
    const filtered = await Product.find({
      $or: [
        { name: { $regex: q, $options: "i" } }, // search name
        { tags: { $regex: q, $options: "i" } }, // search tags
      ],
    });

    res.status(200).json(filtered);
  } catch (error) {
    console.error("❌ Search Products Error:", error);
    res.status(500).json({
      message: "Server error during product search",
      error: error.message,
    });
  }
};

export {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
};
