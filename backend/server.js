import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import productRoute from "./routes/product.route.js";
import userRoute from "./routes/user.route.js";
import orderRoute from "./routes/order.route.js";
import cartRoute from "./routes/cart.route.js";
import session from "express-session";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // your React app URL
    credentials: true, // allow cookies (important for session)
  })
);
app.use(
  session({
    secret: "your_secret_key", // change this to a strong secret
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // set to true if using HTTPS
  })
);

app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use("/api/products", productRoute);
app.use("/api/users", userRoute);
app.use("/api/orders", orderRoute);
app.use("/api/carts", cartRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
