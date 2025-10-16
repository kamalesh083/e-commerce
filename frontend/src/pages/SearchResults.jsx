import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router";
import NoProductsFound from "@/components/NoProductsFound";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const query = searchParams.get("query");
  const navigate = useNavigate();

  useEffect(() => {
    if (query) {
      axios
        .get(
          `http://localhost:5000/api/products/search?q=${encodeURIComponent(
            query
          )}`
        )
        .then((res) => setProducts(res.data))
        .catch((err) => console.error("Search error:", err));
    }
  }, [query]);

  const handleClick = (id) => () => {
    navigate(`/products/${id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white p-8">
      {/* Page Heading */}
      <h2 className="text-4xl md:text-5xl font-extrabold mb-12 text-center text-purple-300 tracking-wide animate-pulse">
        Search Results for “{query}”
      </h2>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
          {products.map((p) => (
            <div
              key={p._id}
              onClick={handleClick(p._id)}
              className="relative cursor-pointer group transition-transform transform hover:scale-105"
            >
              {/* Product Card */}
              <div className="bg-gray-900/50 backdrop-blur-md p-4 rounded-3xl shadow-2xl hover:shadow-purple-500/40 transition-all overflow-hidden border border-purple-600/40">
                <img
                  src={p.imageUrl}
                  alt={p.name}
                  className="w-full h-56 object-contain rounded-2xl transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Product Info */}
              <div className="mt-4 flex flex-col gap-1 px-1">
                <h3 className="text-white font-bold text-lg md:text-xl truncate hover:text-purple-300 transition-colors">
                  {p.name}
                </h3>
                <p className="text-green-400 font-extrabold text-lg md:text-2xl">
                  ${p.price}
                </p>
                <p className="text-gray-400 text-sm md:text-base">
                  Stock: {p.stock}
                </p>

                {/* Category Badge */}
                {p.category && (
                  <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs md:text-sm font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500">
                    {p.category}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex-grow flex items-center justify-center mt-24">
          <NoProductsFound />
        </div>
      )}
    </div>
  );
};

export default SearchResults;
