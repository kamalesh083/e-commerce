// CheckoutPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";
import { ArrowLeft } from "lucide-react";
import ShoppingLoader from "@/components/ShoppingLoader";

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/carts", {
          withCredentials: true,
        });
        const items = res.data.items;
        setCartItems(items);

        // Calculate amounts
        let sub = 0;
        for (let item of items) {
          sub += item.productId.price * item.quantity;
        }
        const t = sub * 0.1; // 10% tax
        setSubtotal(sub);
        setTax(t);
        setTotal(sub + t);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load cart.");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const handleBuyAll = async () => {
    if (cartItems.length === 0) return toast.error("Cart is empty!");
    toast.success("Payment flow goes here");
    // Blockchain or backend payment integration
  };

  if (loading) return <ShoppingLoader />;

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white relative">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800/70 hover:bg-gray-700/80 text-purple-400 font-medium backdrop-blur-md shadow-lg absolute top-8 left-8 transition-all"
      >
        <ArrowLeft className="w-5 h-5" />
        Back
      </button>

      <h1 className="text-4xl font-bold text-purple-400 text-center mb-10">
        Checkout / Invoice
      </h1>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20 space-y-8">
          <p className="text-gray-400 text-xl">
            Your cart is empty! Add products before checking out.
          </p>
          <button
            onClick={() => navigate("/products")}
            className="mt-4 px-8 py-3 bg-purple-600 hover:bg-purple-500 rounded-full font-semibold text-lg transition-all shadow-lg hover:scale-105"
          >
            Browse Products
          </button>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10 items-start">
          {/* Left: Scrollable Product Table */}
          <div className="flex-1 overflow-y-auto max-h-[80vh] bg-gray-800/60 p-6 rounded-3xl shadow-2xl border border-purple-600">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="text-left border-b border-purple-500/50">
                  <th className="px-4 py-2 text-purple-300">Product</th>
                  <th className="px-4 py-2 text-purple-300">Qty</th>
                  <th className="px-4 py-2 text-purple-300">Price</th>
                  <th className="px-4 py-2 text-purple-300">Total</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr
                    key={item._id || item.productId._id}
                    className="border-b border-purple-500/20 hover:bg-gray-700/50 transition-colors"
                  >
                    <td className="px-4 py-3 flex items-center gap-3">
                      <img
                        src={item.productId.imageUrl}
                        alt={item.productId.name}
                        className="w-16 h-16 object-contain rounded-xl border border-purple-500/40"
                      />
                      <span>{item.productId.name}</span>
                    </td>
                    <td className="px-4 py-3">{item.quantity}</td>
                    <td className="px-4 py-3">
                      ${item.productId.price.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-green-400 font-semibold">
                      ${(item.productId.price * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Right: Fixed-Height Bill Summary */}
          <div className="flex-none w-96 bg-gray-800/60 p-6 rounded-3xl shadow-2xl flex flex-col gap-4 border border-purple-600 backdrop-blur-md">
            <h2 className="text-3xl font-bold text-purple-300 mb-4">
              Bill Summary
            </h2>
            <div className="flex justify-between text-white text-lg">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-white text-lg">
              <span>Tax (10%):</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xl font-bold text-green-400 border-t border-purple-500/40 pt-2">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button
              onClick={handleBuyAll}
              className="mt-6 bg-green-600 hover:bg-green-500 py-4 rounded-3xl font-semibold text-lg transition-all shadow-lg hover:scale-105"
            >
              Buy All
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
