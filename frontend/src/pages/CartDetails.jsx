// Cart.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import CartItem from "../components/CartItem";
import ShoppingLoader from "@/components/ShoppingLoader";
import { useNavigate } from "react-router";
import { ShoppingCart } from "lucide-react";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/carts", {
          withCredentials: true, // send JWT cookie
        });
        console.log("Cart data:", res.data.items);
        setCartItems(res.data.items);
        console.log("Total Price:", res.data.totalPrice);
        setTotalPrice(res.data.totalPrice);
      } catch (err) {
        toast.error("Failed to load cart");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  // const handleClearCart = async () => {
  //   try {
  //     const res = await axios.delete("http://localhost:5000/api/carts/clear", {
  //       withCredentials: true,
  //     });
  //     toast.success(res.data.message);
  //     setCartItems([]);
  //     setTotalPrice(0);
  //   } catch (err) {
  //     toast.error("Failed to clear cart.");
  //     console.error(err);
  //   }
  // };
  const handleClearCart = async () => {
    try {
      const res = await axios.delete("http://localhost:5000/api/carts/clear", {
        withCredentials: true,
      });
      toast.success(res.data.message);

      // update state with backend response
      setCartItems(res.data.cart.items);
      setTotalPrice(res.data.cart.totalPrice);
    } catch (err) {
      toast.error("Failed to clear cart.");
      console.error(err);
    }
  };

  const handleCheckout = () => {
    navigate("/checkout");
    toast.success("Proceeding to checkout...");
  };

  if (loading) return <ShoppingLoader />;

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white">
      <h1 className="text-4xl font-bold mb-8 text-purple-400 text-center">
        Your Cart
      </h1>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20 space-y-8 animate-fade-in">
          {/* Animated Shopping Cart Icon */}
          <div className="bg-gray-800/60 p-10 rounded-full shadow-2xl backdrop-blur-md border border-purple-600/40">
            <ShoppingCart className="w-20 h-20 text-purple-400 animate-bounce-slow" />
          </div>

          {/* Gradient Text */}
          <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
            Your cart is empty!
          </h2>

          <p className="text-gray-400 text-center max-w-md leading-relaxed">
            Looks like you haven’t added anything yet. Start exploring and fill
            your cart with amazing products ✨
          </p>

          {/* Call-to-action Button */}
          <button
            onClick={() => navigate("/products")}
            className="mt-4 px-8 py-3 bg-purple-600 hover:bg-purple-500 rounded-full font-semibold text-lg transition-all shadow-lg hover:scale-105"
          >
            🛍️ Browse Products
          </button>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto">
          {/* Cart Items List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cartItems.map((item) => (
              <CartItem
                key={
                  item?.productId?._id?.toString() ||
                  item?.productId?.toString() ||
                  item._id ||
                  Math.random()
                }
                item={item}
                setCartItems={setCartItems}
                setTotalPrice={setTotalPrice}
              />
            ))}
          </div>

          {/* Cart Summary */}
          <div className="mt-10 bg-gray-800/60 p-6 rounded-3xl shadow-lg flex flex-col md:flex-row justify-between items-center gap-6 border-t border-purple-600">
            <div className="text-white text-xl font-semibold">
              Total: <span className="text-purple-400">${totalPrice}</span>
            </div>
            <div className="flex gap-4">
              <button
                onClick={handleClearCart}
                className="bg-red-600 hover:bg-red-500 px-6 py-3 rounded-3xl font-semibold transition-all shadow-md"
              >
                Clear Cart
              </button>
              <button
                onClick={handleCheckout}
                className="bg-purple-600 hover:bg-purple-500 px-6 py-3 rounded-3xl font-semibold transition-all shadow-md"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
