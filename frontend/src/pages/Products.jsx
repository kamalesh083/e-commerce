import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const Products = ({ searchQuery }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        setProducts(response.data);

        // Extract unique categories
        const cats = [
          ...new Set(response.data.map((p) => p.category).filter(Boolean)),
        ];
        setCategories(cats);
      } catch (error) {
        toast.error("Failed to fetch products. Please try again.");
        console.log("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const [filteredProducts, setFilteredProducts] = useState(products);

  // Filter by category or search
  useEffect(() => {
    let filtered = products;

    if (selectedCategory) {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [searchQuery, selectedCategory, products]);

  const handleClick = (id) => () => {
    navigate(`/products/${id}`);
  };

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-900 text-white flex flex-col md:flex-row gap-8">
      {/* Left Sidebar: Categories */}
      <div className="w-full md:w-1/5 bg-gray-800/50 p-4 rounded-3xl sticky top-16 h-max">
        <h2 className="text-xl font-bold text-purple-300 mb-4">Categories</h2>
        <ul className="flex flex-col gap-3">
          <li
            onClick={() => setSelectedCategory("")}
            className={`cursor-pointer px-4 py-2 rounded-lg ${
              selectedCategory === ""
                ? "bg-purple-600 text-white font-semibold"
                : "hover:bg-purple-500/40 transition-colors"
            }`}
          >
            All
          </li>
          {categories.map((cat) => (
            <li
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`cursor-pointer px-4 py-2 rounded-lg ${
                selectedCategory === cat
                  ? "bg-purple-600 text-white font-semibold"
                  : "hover:bg-purple-500/40 transition-colors"
              }`}
            >
              {cat}
            </li>
          ))}
        </ul>
      </div>

      {/* Right: Products Grid */}
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredProducts.map((p) => (
          <div
            key={p._id}
            onClick={handleClick(p._id)}
            className="relative cursor-pointer group transition-transform transform hover:scale-105"
          >
            <div className="overflow-hidden rounded-3xl shadow-2xl">
              <img
                src={p.imageUrl}
                alt={p.name}
                className="w-full h-64 object-contain bg-gradient-to-tr from-purple-900 via-gray-900 to-black p-4 transition-all group-hover:scale-110"
              />
            </div>

            <div className="mt-4 flex flex-col gap-1">
              <h3 className="text-white font-bold text-lg md:text-xl truncate">
                {p.name}
              </h3>
              <p className="text-green-400 font-semibold text-lg md:text-xl">
                ${p.price}
              </p>
              <p className="text-gray-400 text-sm md:text-base">
                Stock: {p.stock}
              </p>
            </div>

            {p.category && (
              <span className="absolute top-4 left-4 bg-purple-700/70 text-white px-3 py-1 rounded-full text-xs md:text-sm font-medium backdrop-blur-md">
                {p.category}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
