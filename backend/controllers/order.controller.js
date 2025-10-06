const orders = [
  {
    id: 1,
    userId: 1, // belongs to John Doe
    products: [
      { productId: 101, name: "Laptop", quantity: 1, price: 1200 },
      { productId: 102, name: "Mouse", quantity: 2, price: 20 },
    ],
    total: 1240,
  },
  {
    id: 2,
    userId: 2, // belongs to Kamalesh
    products: [{ productId: 103, name: "Keyboard", quantity: 1, price: 50 }],
    total: 50,
  },
];

const getAllOrder = (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  const userOrders = orders.filter((order) => order.userId === userId);
  if (userOrders.length === 0) {
    return res.status(404).json({ message: "No orders found for this user." });
  }

  return res.status(200).json(userOrders);
};

export default getAllOrder;
