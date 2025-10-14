import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import productRoute from "./routes/product.route.js";
import userRoute from "./routes/user.route.js";
import orderRoute from "./routes/order.route.js";
import cartRoute from "./routes/cart.route.js";
import wishListRoute from "./routes/wishList.route.js";

import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // your React app
    credentials: true, // ✅ needed for cookies
  })
);

app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

app.use("/api/products", productRoute);
app.use("/api/users", userRoute);
app.use("/api/orders", orderRoute);
app.use("/api/carts", cartRoute);
app.use("/api/wishlist", wishListRoute);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server is running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to the database:", err);
  });
