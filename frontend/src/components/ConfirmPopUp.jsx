import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

const ConfirmOrderModal = ({ product, quantity, onClose, onConfirm }) => {
  const [qty, setQty] = useState(quantity);
  const [tax, setTax] = useState(0);

  useEffect(() => {
    setTax((product.price * qty * 0.1).toFixed(2)); // 10% tax
  }, [qty, product.price]);

  const handleIncrease = () => {
    if (qty < product.stock) setQty(qty + 1);
  };

  const handleDecrease = () => {
    if (qty > 1) setQty(qty - 1);
  };

  const subtotal = (product.price * qty).toFixed(2);
  const total = (parseFloat(subtotal) + parseFloat(tax)).toFixed(2);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      {/* Modal card */}
      <div className="bg-gray-900 rounded-3xl shadow-2xl w-full max-w-md p-8 relative flex flex-col gap-6 border border-purple-600">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-all"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <h2 className="text-3xl font-bold text-purple-400 text-center">
          Confirm Your Order
        </h2>

        {/* Product Info */}
        <div className="flex gap-4 items-center bg-gray-800/70 p-4 rounded-2xl border border-purple-600 shadow-inner">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-24 h-24 object-contain rounded-xl border border-purple-500/40"
          />
          <div className="flex-1 flex flex-col justify-between">
            <h3 className="text-xl font-semibold text-purple-300">
              {product.name}
            </h3>
            <p className="text-green-400 font-semibold text-lg">
              ${product.price} per item
            </p>
            <p className="text-gray-400 text-sm">Stock: {product.stock}</p>
          </div>
        </div>

        {/* Quantity Selector */}
        <div className="flex items-center justify-center gap-6 mt-2">
          <button
            onClick={handleDecrease}
            className="bg-purple-700 hover:bg-purple-600 text-white px-4 py-2 rounded-full text-lg font-bold transition-all"
          >
            -
          </button>
          <span className="text-xl font-semibold text-white">{qty}</span>
          <button
            onClick={handleIncrease}
            className="bg-purple-700 hover:bg-purple-600 text-white px-4 py-2 rounded-full text-lg font-bold transition-all"
          >
            +
          </button>
        </div>

        {/* Bill Summary */}
        <div className="bg-gray-800/70 p-4 rounded-2xl border border-purple-600 shadow-inner mt-2">
          <h3 className="text-xl font-bold text-purple-300 mb-4">
            Bill Summary
          </h3>
          <div className="grid grid-cols-2 gap-2 text-white font-medium">
            <span>Product:</span>
            <span>{product.name}</span>

            <span>Price per item:</span>
            <span>${product.price}</span>

            <span>Quantity:</span>
            <span>{qty}</span>

            <span>Subtotal:</span>
            <span>${subtotal}</span>

            <span>Tax (10%):</span>
            <span>${tax}</span>

            <span className="font-bold text-green-400 text-lg">Total:</span>
            <span className="font-bold text-green-400 text-lg">${total}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-3xl font-semibold text-lg transition-all shadow-lg"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(qty)}
            className="flex-1 bg-green-600 hover:bg-green-500 text-white py-3 rounded-3xl font-semibold text-lg transition-all shadow-lg"
          >
            Confirm Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmOrderModal;
