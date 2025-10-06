import React, { useEffect, useState } from "react";
import { User } from "lucide-react";
import axios from "axios";
import { Link } from "react-router";

const UserMenu = () => {
  const [user, setUser] = useState(null);

  // Fetch current user on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users/me", {
          withCredentials: true,
        });
        setUser(res.data.user);
      } catch (err) {
        console.error("Failed to fetch user:", err);
        setUser(null); // Not logged in
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/users/logout",
        {},
        { withCredentials: true }
      );
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
        <div className="relative flex items-center gap-3">
          <User
            className="w-10 h-10 text-purple-400 cursor-pointer hover:text-purple-300 transition-colors duration-200 ring-2 ring-purple-600 rounded-full p-1"
            strokeWidth={1.5}
          />
          <span className="text-purple-300 font-medium">{user.username}</span>
          <button
            onClick={handleLogout}
            className="text-sm text-red-400 hover:text-red-300 font-medium transition-colors duration-200"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
