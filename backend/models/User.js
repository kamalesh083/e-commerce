import mongoose from "mongoose";

const shippingSchema = new mongoose.Schema({
  address: String,
  city: String,
  state: String,
  postalCode: String,
  country: String,
});

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    wishList: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    shippingDetails: shippingSchema,
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
