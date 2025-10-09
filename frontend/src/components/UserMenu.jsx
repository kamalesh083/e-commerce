import React, { useEffect, useRef, useState } from "react";
import { User, LogOut, ShoppingBag, Settings, ChevronDown } from "lucide-react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router";

const UserMenu = () => {
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  // run on mount AND whenever the route changes
  const location = useLocation();
  const navigate = useNavigate();

  // Fetch current user on mount
  const fetchUser = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/users/check-auth",
        {
          withCredentials: true,
        }
      );
      setUser(res.data?.user ?? null);
    } catch (err) {
      console.error("Failed to fetch user:", err);
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  console.log("Current User:", user);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/users/logout",
        {},
        { withCredentials: true }
      );
      // console.log(user.data.name);
      navigate("/");
      setUser(null);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="flex items-center gap-3">
      {!user ? (
        <div className="flex items-center gap-2">
          <Link
            to="/login"
            className="text-purple-400 hover:text-purple-300 underline font-medium text-sm transition-colors duration-200"
          >
            Login
          </Link>
          <span className="text-gray-400 font-medium text-sm mx-1">or</span>
          <Link
            to="/signup"
            className="text-purple-400 hover:text-purple-300 hover:underline font-medium text-sm transition-colors duration-200"
          >
            SignUp
          </Link>
        </div>
      ) : (
        <div className="relative" ref={dropdownRef}>
          <div
            onClick={() => setShowDropdown((prev) => !prev)}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <User
              className="w-9 h-9 text-purple-400 group-hover:text-purple-300 transition-colors duration-200 ring-2 ring-purple-600 rounded-full p-1"
              strokeWidth={1.5}
            />
            <span className="text-purple-300 font-medium">
              {user.firstName + " " + user.lastName}
            </span>
            <ChevronDown
              className={`w-4 h-4 text-purple-300 transition-transform duration-200 ${
                showDropdown ? "rotate-180" : ""
              }`}
            />
          </div>

          {showDropdown && (
            <div className="absolute right-0 mt-3 w-52 bg-gray-900/95 backdrop-blur-md border border-purple-700/30 text-white rounded-xl shadow-2xl z-50 overflow-hidden">
              <div className="p-3 border-b border-purple-700/40">
                <p className="text-sm font-semibold text-purple-300">
                  {user.name}
                </p>
                <p className="text-xs text-gray-400">{user.email}</p>
              </div>

              <div className="flex flex-col py-1">
                <Link
                  to="/profile"
                  className="flex items-center gap-2 px-4 py-2 hover:bg-purple-700/40 transition-all"
                  onClick={() => setShowDropdown(false)}
                >
                  <User size={18} /> Profile
                </Link>
                <Link
                  to="/orders"
                  className="flex items-center gap-2 px-4 py-2 hover:bg-purple-700/40 transition-all"
                  onClick={() => setShowDropdown(false)}
                >
                  <ShoppingBag size={18} /> My Orders
                </Link>
                <Link
                  to="/settings"
                  className="flex items-center gap-2 px-4 py-2 hover:bg-purple-700/40 transition-all"
                  onClick={() => setShowDropdown(false)}
                >
                  <Settings size={18} /> Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 text-red-400 hover:bg-red-700/30 transition-all w-full text-left"
                >
                  <LogOut size={18} /> Logout
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserMenu;
