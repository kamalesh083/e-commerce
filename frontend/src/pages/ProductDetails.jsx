// ProductDetails.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ArrowLeft, Heart, HeartOff } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import ShoppingLoader from "@/components/ShoppingLoader";
import ConfirmOrderModal from "../components/ConfirmPopUp";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderQuantity, setOrderQuantity] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        toast.error("Failed to load product details.");
        console.log(err);
      }
    };

    const checkWishlistStatus = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/wishlist", {
          withCredentials: true,
        });
        const found = res.data.wishlist.some((p) => p._id === id);
        setIsWishlisted(found);
      } catch (err) {
        console.log("⚠️ Could not check wishlist (user not logged in)", err);
      }
    };

    fetchProduct();
    checkWishlistStatus();
  }, [id]);

  if (!product)
    return (
      <div className="text-white p-4">
        <ShoppingLoader />
      </div>
    );

  const handleAddToCart = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/carts/add",
        {
          productId: product._id,
          quantity: 1,
        },
        { withCredentials: true }
      );
      toast.success("Added to cart!");
      console.log(res.data);
    } catch (err) {
      if (err?.response?.data?.message === "Unauthorized - No token") {
        toast.error("Please login to add items to cart.");
      } else {
        toast.error(err?.response?.data?.message || "Failed to add to cart.");
      }
      console.log(err);
    }
  };

  const handleToggleWishlist = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/wishlist/toggle",
        { productId: product._id },
        { withCredentials: true }
      );
      toast.success(res.data.message);
      setIsWishlisted((prev) => !prev);
      console.log(res.data);
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.message === "Unauthorized - No token") {
        toast.error("Please login to manage your wishlist.");
      } else {
        toast.error("Failed to update wishlist.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white p-16 relative">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800/70 hover:bg-gray-700/80 text-purple-400 font-medium backdrop-blur-md shadow-lg absolute top-8 left-8 transition-all"
      >
        <ArrowLeft className="w-5 h-5" />
        Back
      </button>

      {/* Main content */}
      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row gap-16 pt-12">
        {/* Left: Image */}
        <div className="relative flex-1 flex justify-center items-start">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full max-w-2xl h-auto object-contain rounded-3xl border border-purple-500/40 shadow-2xl"
          />
          {/* Wishlist Heart */}
          <button
            onClick={handleToggleWishlist}
            className="absolute top-4 right-4 p-3 bg-gray-800/70 hover:bg-gray-700 rounded-full shadow-lg transition-all"
          >
            {isWishlisted ? (
              <Heart className="w-6 h-6 text-red-500 fill-current" />
            ) : (
              <Heart className="w-6 h-6 text-gray-300" />
            )}
          </button>
        </div>

        {/* Right: Details */}
        <div className="flex-1 flex flex-col gap-6">
          <h1 className="text-4xl font-bold text-purple-300">{product.name}</h1>
          <p className="text-3xl font-semibold text-green-400">
            ${product.price}
          </p>
          <p className="text-gray-400">Stock: {product.stock}</p>
          <p className="text-gray-400">Category: {product.category}</p>

          {product.tags && (
            <div className="flex flex-wrap gap-3">
              {product.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-purple-700/50 text-purple-100 px-4 py-2 rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <p className="text-gray-300 text-lg mt-4">{product.description}</p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button
              className="flex-1 bg-purple-600 hover:bg-purple-500 py-4 rounded-3xl font-semibold text-lg transition-all"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
            <button
              className="flex-1 bg-green-600 hover:bg-green-500 py-4 rounded-3xl font-semibold text-lg transition-all"
              onClick={() => setIsModalOpen(true)}
            >
              Order Now
            </button>
          </div>

          {/* Highlights */}
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-purple-300 mb-4">
              Highlights
            </h2>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>High-quality materials</li>
              <li>Latest technology integrated</li>
              <li>Durable and reliable</li>
              <li>Perfect for everyday use</li>
            </ul>
          </div>

          {/* Reviews */}
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-purple-300 mb-4">
              Customer Reviews
            </h2>
            <div className="space-y-4">
              <div className="bg-gray-800/70 p-4 rounded-xl shadow-md">
                <p className="text-gray-300 font-medium">John D.</p>
                <p className="text-yellow-400">★★★★☆</p>
                <p className="text-gray-300 mt-1">
                  Great product! Highly recommended.
                </p>
              </div>
              <div className="bg-gray-800/70 p-4 rounded-xl shadow-md">
                <p className="text-gray-300 font-medium">Alice M.</p>
                <p className="text-yellow-400">★★★★★</p>
                <p className="text-gray-300 mt-1">
                  Love it! Excellent quality and fast delivery.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirm Order Modal */}
      {isModalOpen && (
        <ConfirmOrderModal
          product={product}
          quantity={orderQuantity}
          onClose={() => setIsModalOpen(false)}
          onConfirm={async () => {
            try {
              await axios.post(
                "http://localhost:5000/api/orders",
                {
                  productId: product._id,
                  quantity: orderQuantity,
                },
                { withCredentials: true }
              );
              toast.success("Order confirmed!");
              setIsModalOpen(false);
              navigate("/my-orders");
            } catch (err) {
              console.log(err);
              toast.error("Failed to confirm order.");
            }
          }}
        />
      )}
    </div>
  );
};

export default ProductDetails;
