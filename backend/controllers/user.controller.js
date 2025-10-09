import bcrypt from "bcryptjs";
import User from "../models/User.js";
import generateAccessToken from "../utils/generateTokens.js";

const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingUsers = await User.findOne({ email });
    if (existingUsers) {
      return res.status(404).json({ message: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    generateAccessToken(res, newUser._id);
    console.log(newUser);
    res.status(201).json(newUser);
  } catch (error) {
    console.error("❌ Signup Error:", error);
    res
      .status(500)
      .json({ message: "Server error during signup", error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Account Not Found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token and set it as a cookie
    const token = generateAccessToken(res, user._id);

    // Send user info along with message so frontend can update state
    res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("❌ Login Error:", error);
    res.status(500).json({
      message: "Server error during login",
      error: error.message,
    });
  }
};

const logout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "User logged out successfully" });
};
// const forgotPassword = (req, res) => {
//   const { email } = req.body;
//   if (!email) {
//     return res.status(400).json({ message: "Email is required" });
//   }
//   const user = users.find((u) => u.email === email);
//   if (!user) {
//     return res.status(404).json({ message: "User not found" });
//   }
//   // In a real application, you would send an email with a reset link here
//   res
//     .status(200)
//     .json({ message: "Password reset link has been sent to your email" });
// };

const resetPassword = async (req, res) => {
  const { email, password } = req.body;
  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  user.password = hashedPassword;
  console.log(user);
  await user.save();

  // In a real application, you would verify the reset token and update the user's password here
  res.status(200).json({ message: "Password has been reset successfully" });
};

const checkAuth = async (req, res) => {
  try {
    if (!req.userId)
      return res.status(401).json({ message: "Unauthorized - No userId" });

    const user = await User.findById(req.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("CheckAuth Error:", error.message); // log detailed error
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export { signup, login, logout, resetPassword, checkAuth };
