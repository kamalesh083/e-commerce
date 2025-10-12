// ProductDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";
import ShoppingLoader from "@/components/ShoppingLoader";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

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
    fetchProduct();
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
        { withCredentials: true } // ensures JWT cookie is sent
      );
      toast.success("Added to cart!");
      console.log(res.data);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to add to cart.");
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white p-16 flex justify-center">
      <div className="w-full max-w-7xl flex flex-col md:flex-row gap-16">
        {/* Left: Image */}
        <div className="flex-1 flex justify-center items-start">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full max-w-2xl h-auto object-contain rounded-3xl border border-purple-500/40 shadow-2xl"
          />
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
            <button className="flex-1 bg-green-600 hover:bg-green-500 py-4 rounded-3xl font-semibold text-lg transition-all">
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
    </div>
  );
};

export default ProductDetails;
