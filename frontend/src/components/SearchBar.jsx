import React, { useEffect, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { useNavigate } from "react-router";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [recent, setRecent] = useState([]);
  const [timer, setTimer] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const wrapperRef = useRef(null);
  const navigate = useNavigate();

  // Debounced fetch from server
  useEffect(() => {
    if (timer) clearTimeout(timer);

    const newTimer = setTimeout(async () => {
      if (!query) {
        setResults([]);
        return;
      }
      try {
        const res = await fetch(
          `http://localhost:5000/api/products/search?q=${query}`
        );
        const data = await res.json();
        setResults(data);
      } catch (err) {
        console.error(err);
        setResults([]);
      }
    }, 300);

    setTimer(newTimer);
    return () => clearTimeout(newTimer);
  }, [query]);

  // Hide dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (name) => {
    setQuery("");
    setResults([]);
    setShowDropdown(false);

    setRecent((prev) => {
      const updated = [name, ...prev.filter((r) => r !== name)];
      return updated.slice(0, 5);
    });

    if (onSearch) onSearch(name);

    // Navigate to /search?query=<name>
    navigate(`/search?query=${encodeURIComponent(name)}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && query) {
      // Add to recent even if no results
      setRecent((prev) => {
        const updated = [query, ...prev.filter((r) => r !== query)];
        return updated.slice(0, 5);
      });

      handleSelect(query);
    }
  };

  const handleClear = () => {
    setQuery("");
    setResults([]);
    setShowDropdown(false);
    if (onSearch) onSearch("");
  };

  return (
    <div className="relative w-full max-w-md" ref={wrapperRef}>
      {/* Search Input */}
      <div className="flex items-center bg-gray-800/80 border border-purple-500/40 rounded-full px-4 py-2 shadow-md hover:shadow-purple-500/20 transition-all duration-300 relative">
        <Search className="text-purple-400 w-5 h-5 mr-3" />
        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowDropdown(true)}
          className="bg-transparent text-white placeholder-gray-400 w-full focus:outline-none pr-7"
        />
        {query && (
          <X
            className="absolute right-3 text-gray-400 w-5 h-5 cursor-pointer hover:text-purple-400 transition-colors"
            onClick={handleClear}
          />
        )}
      </div>

      {/* Dropdown */}
      {showDropdown && (results.length > 0 || query || recent.length > 0) && (
        <div className="absolute top-full left-0 right-0 bg-gray-800 border border-purple-500 rounded-b-md mt-1 z-10 max-h-72 overflow-y-auto shadow-lg transition-all duration-200 ease-out transform scale-y-100 origin-top">
          {/* Results Section */}
          {query && results.length > 0 && (
            <div className="p-2">
              <strong className="text-purple-300">Results:</strong>
              <ul>
                {results.map((p) => (
                  <li
                    key={p.id}
                    className="cursor-pointer px-2 py-1 hover:bg-purple-600 transition-colors duration-200 rounded"
                    onClick={() => handleSelect(p.name)}
                  >
                    {p.name}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* No Products Found */}
          {query && results.length === 0 && (
            <div className="p-4 text-center text-gray-300 italic">
              <p className="text-gray-400">No products found for:</p>
              <p className="text-purple-300 font-semibold mt-1">"{query}"</p>
            </div>
          )}

          {/* Recent Searches */}
          {recent.length > 0 && (
            <div
              className={`p-2 border-t border-purple-500/40 ${
                query && results.length === 0 ? "rounded-b-md" : ""
              }`}
            >
              <strong className="text-purple-300">
                {query ? "Recent:" : "Recent Searches:"}
              </strong>
              <ul className="flex flex-wrap gap-2 mt-1">
                {recent.map((r, idx) => (
                  <li
                    key={idx}
                    className="bg-purple-600/40 text-white px-2 py-1 rounded-full cursor-pointer hover:bg-purple-500 transition-all duration-200"
                    onClick={() => handleSelect(r)}
                  >
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
