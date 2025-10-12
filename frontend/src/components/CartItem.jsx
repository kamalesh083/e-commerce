// CartItem.jsx
import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const CartItem = ({ item, setCartItems, setTotalPrice }) => {
  const navigate = useNavigate();

  const product = item.productId;
  if (!product) return null;

  const handleRemoveItem = async () => {
    if (!product._id) return;

    try {
      const res = await axios.delete(
        `http://localhost:5000/api/carts/${product._id}`,
        { withCredentials: true }
      );
      toast.success(res.data.message);
      setCartItems(res.data.cart.items);
      setTotalPrice(res.data.cart.totalPrice);
    } catch (err) {
      toast.error("Failed to remove item.");
      console.error(err);
    }
  };

  const handleQuantityChange = async (newQty) => {
    if (!product._id || newQty < 1) return;
    const qtyToAdd = newQty - item.quantity;
    if (qtyToAdd === 0) return;

    try {
      const res = await axios.post(
        "http://localhost:5000/api/carts/add",
        { productId: product._id, quantity: qtyToAdd },
        { withCredentials: true }
      );
      setCartItems(res.data.cart.items);
      setTotalPrice(res.data.cart.totalPrice);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to update quantity.");
      console.error(err);
    }
  };

  const handleOnClick = () => {
    navigate(`/products/${product._id}`);
  };

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 bg-gray-900/80 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 w-full max-w-4xl mx-auto">
      {/* Product Image */}
      <div className="flex-shrink-0 w-full md:w-32 h-32 md:h-32 bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center">
        <img
          src={product.imageUrl || "/placeholder.png"}
          alt={product.name || "Product"}
          className="object-contain w-full h-full"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 flex flex-col justify-between w-full overflow-hidden">
        <h2
          className="text-lg md:text-xl font-bold text-purple-300 truncate cursor-pointer hover:underline"
          onClick={handleOnClick}
        >
          {product.name}
        </h2>
        <p className="text-purple-400 text-lg mt-1">${product.price}</p>

        {/* Quantity & Remove */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mt-3 flex-wrap">
          {/* Quantity Controls */}
          <div className="flex items-center border border-gray-700 rounded-lg overflow-hidden">
            <button
              onClick={() => handleQuantityChange(item.quantity - 1)}
              className="bg-gray-700 hover:bg-gray-600 px-3 py-1 text-lg font-bold transition-colors"
            >
              -
            </button>
            <span className="px-4 text-white font-semibold">
              {item.quantity}
            </span>
            <button
              onClick={() => handleQuantityChange(item.quantity + 1)}
              className="bg-gray-700 hover:bg-gray-600 px-3 py-1 text-lg font-bold transition-colors"
            >
              +
            </button>
          </div>

          {/* Remove Button */}
          <button
            onClick={handleRemoveItem}
            className="bg-red-600 hover:bg-red-500 px-4 py-2 rounded-xl text-white font-semibold transition-all shadow-md whitespace-nowrap"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
