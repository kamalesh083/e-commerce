import React from "react";
import SearchBar from "./SearchBar";
import logo from "../assets/logo1.png";
import logoName from "../assets/logoName1.png";
import { User } from "lucide-react";
import Navbar2 from "./Navbar2";
import { Link } from "react-router";

const Navbar = ({ onSearch }) => {
  const isLoggedIn = false; // Replace with actual authentication logic
  return (
    <div className="flex justify-between items-center p-4 bg-gray-900/80 backdrop-blur-md border-b border-purple-500/20 shadow-md">
      {/* Logo on the left */}
      <div className="flex items-center gap-1">
        <img src={logo} alt="logo" className="w-12 h-auto" />
        <img src={logoName} alt="logoName" className="h-10" />
      </div>

      <Navbar2 />

      {/* Right side: search + login/signup or avatar */}
      <div className="flex items-center gap-4">
        <SearchBar onSearch={onSearch} />
        {!isLoggedIn ? (
          <div className="flex items-center gap-2">
            <button className="text-purple-400 hover:text-purple-300 underline font-medium text-sm transition-colors duration-200">
              <Link to="/login">Login</Link>
            </button>
            <span className="text-gray-400 font-medium text-sm mx-1">Or</span>
            <button className="text-purple-400 hover:text-purple-300 hover:underline font-medium text-sm transition-colors duration-200">
              <Link to="/signup">SignUp</Link>
            </button>
          </div>
        ) : (
          <div className="relative">
            <User
              className="w-10 h-10 text-purple-400 cursor-pointer hover:text-purple-300 transition-colors duration-200 ring-2 ring-purple-600 rounded-full p-1"
              strokeWidth={1.5}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
