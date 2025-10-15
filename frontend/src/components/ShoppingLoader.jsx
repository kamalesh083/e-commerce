import React from "react";
import { ShoppingCart } from "lucide-react";

const ShoppingLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white">
      {/* Glowing Shopping Cart */}
      <div className="relative">
        <div className="absolute inset-0 blur-xl bg-purple-500/30 rounded-full animate-pulse"></div>
        <ShoppingCart className="w-20 h-20 text-purple-400 drop-shadow-[0_0_10px_rgba(168,85,247,0.8)] animate-bounce-slow relative z-10" />
        {/* Spinning ring around the cart */}
        <div className="absolute -bottom-2 -left-2 w-24 h-24 rounded-full border-4 border-dashed border-purple-500/50 animate-spin-slow"></div>
      </div>

      {/* Loading Text with shimmer effect */}
      <div className="mt-6 bg-gradient-to-r from-purple-400 via-pink-300 to-purple-400 bg-[length:200%_100%] animate-shimmer text-transparent bg-clip-text font-semibold text-lg">
        Loading your cart...
      </div>

      {/* Progress bar */}
      <div className="w-64 h-2 bg-purple-800 rounded-full mt-6 overflow-hidden shadow-inner shadow-purple-700/50">
        <div className="h-full bg-gradient-to-r from-pink-500 to-purple-500 animate-progress"></div>
      </div>

      {/* Tagline */}
      <p className="mt-5 text-gray-400 italic text-sm">
        Fetching your wishlist vibes ✨
      </p>
    </div>
  );
};

export default ShoppingLoader;
