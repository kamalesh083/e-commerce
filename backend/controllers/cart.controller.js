const cartItems = [
  { id: 1, name: "Product 1", quantity: 2, price: 10.0 },
  { id: 2, name: "Product 2", quantity: 1, price: 20.0 },
];

const getAllCartItems = (req, res) => {
  res.status(200).json(cartItems);
};

const getCartItemById = (req, res) => {
  const itemId = parseInt(req.params.id, 10);
  const item = cartItems.find((i) => i.id === itemId);
  if (!item) {
    res.status(404).json({ message: "Item not found" });
  }
  res.status(200).json(item);
};

const addItemToCart = (req, res) => {
  const { name, quantity, price } = req.body;
  const newItem = {
    id: cartItems.length + 1,
    name,
    quantity,
    price,
  };
  cartItems.push(newItem);
  res.status(201).json(newItem);
  if (quantity <= 0 || price <= 0) {
    res.status(400).json({ message: "Invalid item data" });
  }
};
const updateCartItem = (req, res) => {
  const itemId = req.params.id;
  const { name, quantity, price } = req.body;
  const itemIndex = cartItems.findIndex((i) => i.id === parseInt(itemId, 10));
  if (itemIndex === -1) {
    res.status(404).json({ message: "Item not found" });
  }
  if (name) cartItems[itemIndex].name = name;
  if (quantity) cartItems[itemIndex].quantity = quantity;
  if (price) cartItems[itemIndex].price = price;
  res.status(200).json(cartItems[itemIndex]);
};

const deleteCartItem = (req, res) => {
  const itemId = req.params.id;
  const itemIndex = cartItems.findIndex((i) => i.id === parseInt(itemId, 10));
  if (itemIndex === -1) {
    res.status(404).json({ message: "Item not found" });
  }
  cartItems.splice(itemIndex, 1);
  res.status(200).json({ message: "Item deleted" });
};

const clearCart = (req, res) => {
  cartItems.length = 0;
  res.status(200).json({ message: "Cart cleared" });
};
export {
  getAllCartItems,
  getCartItemById,
  addItemToCart,
  updateCartItem,
  deleteCartItem,
  clearCart,
};
