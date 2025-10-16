// Profile.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import ShoppingLoader from "@/components/ShoppingLoader";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    shipping: {
      address: "",
      city: "",
      postalCode: "",
      country: "",
      phone: "",
    },
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users/details", {
          withCredentials: true,
        });
        setUser(res.data);
        setFormData(res.data);
      } catch (err) {
        console.error(err);
        toast.error("⚠️ Please login to use the app!");
        navigate("/login");
      }
    };

    fetchUser();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("shipping.")) {
      const key = name.split(".")[1];
      setFormData({
        ...formData,
        shipping: { ...formData.shipping, [key]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSave = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/details",
        formData,
        { withCredentials: true }
      );
      setUser(res.data);
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile.");
    }
  };

  if (!user) return <ShoppingLoader />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black py-16 px-[10%] flex flex-col items-center">
      <h1 className="text-5xl font-extrabold text-purple-300 mb-12 animate-pulse">
        ✨ My Profile ✨
      </h1>

      <div className="w-full flex flex-col gap-6">
        {/* First Name */}
        <div className="flex items-center gap-3">
          <span className="text-3xl">🧑‍🦱</span>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            disabled={!isEditing}
            onChange={handleChange}
            className={`w-full p-3 rounded-xl border border-purple-600 focus:ring-2 focus:ring-purple-400 outline-none bg-gray-900 text-white placeholder-gray-400 ${
              isEditing ? "cursor-text" : "cursor-not-allowed opacity-70"
            }`}
            placeholder="First Name"
          />
        </div>

        {/* Last Name */}
        <div className="flex items-center gap-3">
          <span className="text-3xl">🧑‍💼</span>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            disabled={!isEditing}
            onChange={handleChange}
            className={`w-full p-3 rounded-xl border border-purple-600 focus:ring-2 focus:ring-purple-400 outline-none bg-gray-900 text-white placeholder-gray-400 ${
              isEditing ? "cursor-text" : "cursor-not-allowed opacity-70"
            }`}
            placeholder="Last Name"
          />
        </div>

        {/* Email */}
        <div className="flex items-center gap-3">
          <span className="text-3xl">📧</span>
          <input
            type="email"
            name="email"
            value={formData.email}
            disabled
            className="w-full p-3 rounded-xl border border-purple-600 outline-none bg-gray-900 text-white placeholder-gray-400 opacity-70 cursor-not-allowed"
            placeholder="Email"
          />
        </div>

        {/* Phone */}
        <div className="flex items-center gap-3">
          <span className="text-3xl">📱</span>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            disabled={!isEditing}
            onChange={handleChange}
            className={`w-full p-3 rounded-xl border border-purple-600 focus:ring-2 focus:ring-purple-400 outline-none bg-gray-900 text-white placeholder-gray-400 ${
              isEditing ? "cursor-text" : "cursor-not-allowed opacity-70"
            }`}
            placeholder="Phone"
          />
        </div>

        {/* Shipping Header */}
        <h2 className="text-3xl font-bold text-purple-300 mt-6 mb-4 flex items-center gap-2">
          📍 Shipping Details
        </h2>

        {/* Address */}
        <div className="flex items-center gap-3">
          <span className="text-3xl">🏠</span>
          <input
            type="text"
            name="shipping.address"
            value={formData.shipping.address}
            disabled={!isEditing}
            onChange={handleChange}
            className={`w-full p-3 rounded-xl border border-purple-600 focus:ring-2 focus:ring-purple-400 outline-none bg-gray-900 text-white placeholder-gray-400 ${
              isEditing ? "cursor-text" : "cursor-not-allowed opacity-70"
            }`}
            placeholder="Address"
          />
        </div>

        {/* City */}
        <div className="flex items-center gap-3">
          <span className="text-3xl">🌆</span>
          <input
            type="text"
            name="shipping.city"
            value={formData.shipping.city}
            disabled={!isEditing}
            onChange={handleChange}
            className={`w-full p-3 rounded-xl border border-purple-600 focus:ring-2 focus:ring-purple-400 outline-none bg-gray-900 text-white placeholder-gray-400 ${
              isEditing ? "cursor-text" : "cursor-not-allowed opacity-70"
            }`}
            placeholder="City"
          />
        </div>

        {/* Postal Code */}
        <div className="flex items-center gap-3">
          <span className="text-3xl">🏷️</span>
          <input
            type="text"
            name="shipping.postalCode"
            value={formData.shipping.postalCode}
            disabled={!isEditing}
            onChange={handleChange}
            className={`w-full p-3 rounded-xl border border-purple-600 focus:ring-2 focus:ring-purple-400 outline-none bg-gray-900 text-white placeholder-gray-400 ${
              isEditing ? "cursor-text" : "cursor-not-allowed opacity-70"
            }`}
            placeholder="Postal Code"
          />
        </div>

        {/* Country */}
        <div className="flex items-center gap-3">
          <span className="text-3xl">🌎</span>
          <input
            type="text"
            name="shipping.country"
            value={formData.shipping.country}
            disabled={!isEditing}
            onChange={handleChange}
            className={`w-full p-3 rounded-xl border border-purple-600 focus:ring-2 focus:ring-purple-400 outline-none bg-gray-900 text-white placeholder-gray-400 ${
              isEditing ? "cursor-text" : "cursor-not-allowed opacity-70"
            }`}
            placeholder="Country"
          />
        </div>

        {/* Shipping Phone */}
        <div className="flex items-center gap-3">
          <span className="text-3xl">📞</span>
          <input
            type="text"
            name="shipping.phone"
            value={formData.shipping.phone}
            disabled={!isEditing}
            onChange={handleChange}
            className={`w-full p-3 rounded-xl border border-purple-600 focus:ring-2 focus:ring-purple-400 outline-none bg-gray-900 text-white placeholder-gray-400 ${
              isEditing ? "cursor-text" : "cursor-not-allowed opacity-70"
            }`}
            placeholder="Phone"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 mt-4">
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-500 rounded-full text-white font-semibold transition-all"
            >
              ✏️ Edit Profile
            </button>
          )}
          {isEditing && (
            <>
              <button
                onClick={() => setIsEditing(false)}
                className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-full text-white font-semibold transition-all"
              >
                ❌ Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-3 bg-purple-600 hover:bg-purple-500 rounded-full text-white font-semibold transition-all"
              >
                💾 Save
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
