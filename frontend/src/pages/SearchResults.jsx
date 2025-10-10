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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white p-8">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Results for “{query}”
      </h2>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <div
              key={p._id}
              className="bg-gray-800/80 p-4 rounded-xl shadow-md hover:shadow-purple-400/30 transition-all cursor-pointer"
              onClick={handleClick(p._id)}
            >
              <img
                src={p.imageUrl}
                alt={p.name}
                className="w-full h-52 object-contain mb-3 rounded-md"
              />
              <h3 className="text-lg font-semibold">{p.name}</h3>
              <p className="text-purple-300 font-bold">${p.price}</p>
              <p className="text-gray-400 text-sm mt-1">Stock: {p.stock}</p>
              <p className="text-gray-400 text-sm mt-1">
                Category: {p.category}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex-grow flex items-center justify-center">
          <NoProductsFound />
        </div>
      )}
    </div>
  );
};

export default SearchResults;
