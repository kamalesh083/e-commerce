import React from "react";
import { Login } from "./components/Login";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import Products from "./pages/Products";
import Signup from "./components/Signup";
import ResetPassword from "./components/ResetPassword";
import Navbar from "./components/Navbar";
import ProductDetails from "./pages/ProductDetails";
import SearchResults from "./pages/SearchResults";
import CartDetails from "./pages/CartDetails";
import Wishlist from "./pages/WishList";
import Profile from "./pages/Profile";
import MyOrders from "./pages/MyOrders";
import CheckoutPage from "./pages/Checkout";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white scrollbar-hidden overflow-auto">
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/products" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route path="/cart" element={<CartDetails />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
