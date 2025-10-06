import React from "react";
import { Link } from "react-router"; // If using React Router

const Navbar = () => {
  return (
    <nav className="p-4 flex justify-center">
      <ul className="flex space-x-8 md:space-x-6 lg:space-x-10">
        <li className="relative group">
          <Link
            to="/products"
            className="text-gray-400 font-medium tracking-wide transition-colors duration-200"
          >
            Products
          </Link>
          <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-purple-400 transition-all duration-300 group-hover:w-full"></span>
        </li>

        <li className="relative group">
          <Link
            to="/my-orders"
            className="text-gray-400 font-medium tracking-wide transition-colors duration-200"
          >
            My Orders
          </Link>
          <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-purple-400 transition-all duration-300 group-hover:w-full"></span>
        </li>

        <li className="relative group">
          <Link
            to="/shipping-details"
            className="text-gray-400 font-medium tracking-wide transition-colors duration-200"
          >
            Shipping Details
          </Link>
          <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-purple-400 transition-all duration-300 group-hover:w-full"></span>
        </li>

        <li className="relative group">
          <Link
            to="/profile"
            className="text-gray-400 font-medium tracking-wide transition-colors duration-200"
          >
            Profile
          </Link>
          <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-purple-400 transition-all duration-300 group-hover:w-full"></span>
        </li>

        <li className="relative group">
          <Link
            to="/cart"
            className="text-gray-400 font-medium tracking-wide transition-colors duration-200"
          >
            Cart
          </Link>
          <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-purple-400 transition-all duration-300 group-hover:w-full"></span>
        </li>

        <li className="relative group">
          <Link
            to="/wishlist"
            className="text-gray-400 font-medium tracking-wide transition-colors duration-200"
          >
            Wishlist
          </Link>
          <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-purple-400 transition-all duration-300 group-hover:w-full"></span>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
