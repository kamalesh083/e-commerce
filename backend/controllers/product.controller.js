const products = [
  {
    id: 1,
    name: "Gaming Laptop",
    category: "Electronics",
    tags: ["gaming", "laptop", "electronics"],
    price: 1200,
    stock: 5,
    image:
      "https://images.unsplash.com/photo-1587202372775-198cb4c3f61a?auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 2,
    name: "Wireless Mouse",
    category: "Electronics",
    tags: ["mouse", "wireless", "electronics", "accessory"],
    price: 25,
    stock: 20,
    image:
      "https://images.unsplash.com/photo-1587825140504-78d5f1f30c5e?auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 3,
    name: "Mechanical Keyboard",
    category: "Electronics",
    tags: ["keyboard", "mechanical", "electronics", "accessory"],
    price: 70,
    stock: 15,
    image:
      "https://images.unsplash.com/photo-1615579461340-c20de2b5f32e?auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 4,
    name: "Bluetooth Headphones",
    category: "Electronics",
    tags: ["headphones", "bluetooth", "audio"],
    price: 50,
    stock: 10,
    image:
      "https://images.unsplash.com/photo-1598970434795-0c54fe7c0642?auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 5,
    name: "Office Chair",
    category: "Furniture",
    tags: ["chair", "office", "furniture", "comfort"],
    price: 150,
    stock: 8,
    image:
      "https://images.unsplash.com/photo-1582719478174-1e97c3b63fc1?auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 6,
    name: "Wooden Desk",
    category: "Furniture",
    tags: ["desk", "wood", "furniture", "office"],
    price: 200,
    stock: 4,
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 7,
    name: "Smartphone",
    category: "Electronics",
    tags: ["phone", "smartphone", "electronics", "mobile"],
    price: 800,
    stock: 12,
    image:
      "https://images.unsplash.com/photo-1512499617640-c2f99912e69c?auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 8,
    name: "Tablet",
    category: "Electronics",
    tags: ["tablet", "mobile", "electronics", "gadget"],
    price: 400,
    stock: 7,
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=500&q=60",
  },
];

const getAllProducts = (req, res) => {
  res.status(200).json(products);
};

const getProductById = (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.status(200).json(product);
};

const addProduct = (req, res) => {
  const { name, category, tags, stock, price } = req.body;
  if (!name || !category || !tags || !stock || !price) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const newProduct = {
    id: products.length + 1,
    name,
    category,
    tags,
    price,
    stock,
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
};

const updateProduct = (req, res) => {
  const id = parseInt(req.params.id);
  const { name, category, tags, stock, price } = req.body;
  const productIndex = products.findIndex((p) => p.id === id);

  if (productIndex === -1) {
    return res.status(404).json({ message: "Product not found" });
  }

  if (name) products[productIndex].name = name;
  if (category) products[productIndex].category = category;
  if (tags) products[productIndex].tags = tags;
  if (stock) products[productIndex].stock = stock;
  if (price) products[productIndex].price = price;

  res.status(200).json(products[productIndex]);
};

const deleteProduct = (req, res) => {
  const id = parseInt(req.params.id);
  const productIndex = products.findIndex((p) => p.id === id);

  if (productIndex === -1) {
    return res.status(404).json({ message: "Product not found" });
  }
  products.splice(productIndex, 1);
  res.status(200).json({ message: "Product deleted successfully" });
};

const searchProducts = (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(200).json(products);

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(q.toLowerCase()) ||
      p.tags.some((tag) => tag.toLowerCase().includes(q.toLowerCase()))
  );

  res.status(200).json(filtered);
};

export {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
};
