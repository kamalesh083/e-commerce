import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Heart } from "lucide-react"; // ✅ use Heart
import { useNavigate } from "react-router";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/wishlist", {
          withCredentials: true,
        });
        setWishlist(res.data.wishlist);
      } catch (err) {
        toast.error("Failed to load wishlist.");
        console.log(err);
      }
    };

    fetchWishlist();
  }, []);

  const handleRemove = async (productId) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/wishlist/toggle",
        { productId },
        { withCredentials: true }
      );
      toast.success(res.data.message);
      setWishlist((prev) => prev.filter((p) => p._id !== productId));
    } catch (err) {
      console.log(err);
      toast.error("Failed to remove product.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white p-16 flex flex-col items-center">
      <h1 className="text-5xl font-extrabold mb-8 text-purple-300 animate-pulse">
        Your Wishlist
      </h1>

      {wishlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20 space-y-6">
          <Heart className="w-20 h-20 text-red-500 animate-bounce" />
          <p className="text-2xl md:text-3xl text-gray-300 text-center font-semibold">
            Oops! Your wishlist is empty 😢
          </p>
          <p className="text-gray-400 text-center max-w-md">
            Add products to your wishlist by clicking the ❤️ icon on the product
            details page.
          </p>
          <button
            onClick={() => navigate("/products")} // or wherever your products page is
            className="mt-4 px-6 py-3 bg-purple-600 hover:bg-purple-500 rounded-full font-semibold text-lg transition-all shadow-lg"
          >
            Browse Products
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
          {wishlist.map((product) => (
            <div
              key={product._id}
              className="relative bg-gray-800/70 p-4 rounded-3xl shadow-lg flex flex-col items-center hover:scale-105 transition-transform"
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-64 object-contain rounded-2xl mb-4"
              />
              <h2 className="text-xl font-bold text-purple-300">
                {product.name}
              </h2>
              <p className="text-green-400 font-semibold">${product.price}</p>

              {/* Remove from wishlist button */}
              <button
                onClick={() => handleRemove(product._id)}
                className="absolute top-4 right-4 p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition"
              >
                <Heart className="w-6 h-6 text-red-500 fill-current" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
