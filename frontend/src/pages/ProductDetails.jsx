// ProductDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";

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

  if (!product) return <div className="text-white p-4">Loading...</div>;

  return (
    <div className="p-8 text-white">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full max-w-lg object-contain mb-4 rounded-md"
      />
      <p className="text-purple-300 text-xl mb-2">${product.price}</p>
      <p className="text-gray-400 mb-2">Stock: {product.stock}</p>
      <p className="text-gray-300">{product.description}</p>
    </div>
  );
};

export default ProductDetails;
