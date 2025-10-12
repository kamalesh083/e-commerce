import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const Products = ({ searchQuery }) => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        setProducts(response.data);
      } catch (error) {
        toast.error("Failed to fetch products. Please try again.");
        console.log("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    if (!searchQuery) return setFilteredProducts(products);

    const filtered = products.filter((p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery, products]);

  const handleClick = (id) => () => {
    navigate(`/products/${id}`);
  };

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {filteredProducts.map((p) => (
        <div
          key={p._id}
          className="bg-gray-800/80 p-4 rounded-lg shadow-md hover:shadow-purple-500/30 transition-all"
          onClick={handleClick(p._id)}
        >
          <img
            src={p.imageUrl}
            alt={p.name}
            className="w-full h-48 object-contain mb-2 rounded-md"
          />
          <h3 className="text-white font-bold text-lg">{p.name}</h3>
          <p className="text-purple-300">${p.price}</p>
          <p className="text-gray-400 text-sm">Stock: {p.stock}</p>
        </div>
      ))}
    </div>
  );
};

export default Products;
