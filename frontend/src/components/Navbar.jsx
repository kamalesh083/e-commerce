import React from "react";
import SearchBar from "./SearchBar";
import logo from "../assets/logo1.png";
import logoName from "../assets/logoName1.png";
import UserMenu from "./UserMenu";
import Navbar2 from "./Navbar2";
import { useNavigate } from "react-router";

const Navbar = () => {
  const navigate = useNavigate();

  const handleSearch = (query) => {
    if (query.trim()) {
      navigate(`/products?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="flex justify-between items-center p-4 bg-gray-900/80 backdrop-blur-md border-b border-purple-500/20 shadow-md">
      {/* Logo on the left */}
      <div className="flex items-center gap-1" onClick={() => navigate("/")}>
        <img src={logo} alt="logo" className="w-12 h-auto" />
        <img src={logoName} alt="logoName" className="h-10" />
      </div>

      <Navbar2 />

      {/* Right side: search + login/signup or avatar */}
      <div className="flex items-center gap-4">
        <SearchBar onSearch={handleSearch} />
        <UserMenu />
      </div>
    </div>
  );
};

export default Navbar;
