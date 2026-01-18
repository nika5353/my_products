import User from "../models/User.js";

export async function getAllUsers(req, res) {
  const users = await User.find().select("-password");
  res.json(users);
}

export async function getMe(req, res) {
  const user = await User.findById(req.userId).select("-password");
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
}