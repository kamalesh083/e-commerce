import React from "react";
import { ShoppingCart } from "lucide-react";

const ShoppingLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-white to-orange-100">
      {/* Spinning Shopping Cart */}
      <div className="relative">
        <ShoppingCart className="w-20 h-20 text-orange-500 animate-bounce-slow drop-shadow-md" />
        {/* Small loading circle behind the cart */}
        <div className="absolute -bottom-2 -left-2 w-24 h-24 rounded-full border-4 border-dashed border-orange-300 animate-spin-slow"></div>
      </div>

      {/* Loading Text with shimmer effect */}
      <div className="mt-6 bg-gradient-to-r from-orange-400 via-orange-200 to-orange-400 bg-[length:200%_100%] animate-shimmer text-transparent bg-clip-text font-semibold text-lg">
        Loading your cart...
      </div>

      {/* Progress bar */}
      <div className="w-64 h-2 bg-orange-200 rounded-full mt-6 overflow-hidden">
        <div className="h-full bg-orange-500 animate-progress"></div>
      </div>

      {/* Tagline */}
      <p className="mt-5 text-gray-700 italic text-sm">
        Fetching the best deals 🛍️
      </p>
    </div>
  );
};

export default ShoppingLoader;
