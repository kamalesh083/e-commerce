const users = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "johndoe87@gmail.com",
    password: "password123",
  },
  {
    id: 2,
    firstName: "kamalesh",
    lastName: "AG",
    email: "kamaleshag96@gmail.com",
    password: "admin123",
  },
];

const signup = (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  if (users.find((u) => u.email === email)) {
    return res.status(409).json({ message: "Email already exists" });
  }
  const newUser = {
    id: users.length + 1,
    firstName,
    lastName,
    email,
    password,
  };
  users.push(newUser);
  console.log(newUser);
  res.status(201).json(newUser);
};

const login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  res.status(200).json({ message: "Login successful", user });
};

const logout = (req, res) => {
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

const resetPassword = (req, res) => {
  const { email, password } = req.body;
  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }
  const user = users.find((u) => u.email === email);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  user.password = password;
  console.log(user);

  // In a real application, you would verify the reset token and update the user's password here
  res.status(200).json({ message: "Password has been reset successfully" });
};

export { signup, login, logout, resetPassword };
