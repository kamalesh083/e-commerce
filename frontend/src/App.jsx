import React from "react";
import { Login } from "./components/Login";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import Products from "./pages/Products";
import Signup from "./components/Signup";
import ResetPassword from "./components/ResetPassword";
import Navbar from "./components/Navbar";
import ProductDetails from "./pages/ProductDetails";
import SearchResults from "./pages/SearchResults";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white">
        <Navbar />

        <Routes>
          <Route path="/" element={<Navigate to="/products" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
