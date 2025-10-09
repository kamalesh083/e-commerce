import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router";

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
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Results for “{query}”</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.length > 0 ? (
          products.map((p) => (
            <div
              key={p._id}
              className="bg-gray-800/80 p-4 rounded-xl shadow-md hover:shadow-purple-400/30 transition-all"
              onClick={handleClick(p._id)}
            >
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-48 object-contain mb-3 rounded-md"
              />
              <h3 className="text-lg font-semibold">{p.name}</h3>
              <p className="text-purple-300">${p.price}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
