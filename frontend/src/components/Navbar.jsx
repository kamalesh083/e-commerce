import React from "react";
import SearchBar from "./SearchBar";
import logo from "../assets/logo1.png";
import logoName from "../assets/logoName1.png";
import UserMenu from "./UserMenu";
import Navbar2 from "./Navbar2";
import { useNavigate } from "react-router";
import { ShoppingCart } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();

  const handleSearch = (query) => {
    if (query.trim()) {
      navigate(`/products?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="relative flex items-center px-6 py-3 bg-gray-900/80 backdrop-blur-md border-b border-purple-500/20 shadow-md w-full">
      {/* Left: Logo */}
      <div
        className="flex items-center gap-2 cursor-pointer z-10"
        onClick={() => navigate("/")}
      >
        <img src={logo} alt="logo" className="w-12 h-auto" />
        <img src={logoName} alt="logoName" className="h-10" />
      </div>

      {/* Center: Navbar2 (desktop only) */}
      <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0">
        <Navbar2 />
      </div>

      {/* Right: Cart + Search + User Menu */}
      <div className="flex items-center gap-5 z-10 ml-auto">
        <button
          onClick={() => navigate("/cart")}
          className="relative p-2 text-purple-400 hover:text-purple-300 transition-colors"
        >
          <ShoppingCart size={26} />
        </button>

        <div className="max-w-[300px]">
          <SearchBar onSearch={handleSearch} />
        </div>

        <UserMenu />
      </div>
    </div>
  );
};

export default Navbar;
