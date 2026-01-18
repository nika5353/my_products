import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../services/token.service.js";

export async function register(req, res) {
  const { username, email, phone, password } = req.body;

  const existing = await User.findOne({ email });
  if (existing) {
    return res.status(400).json({ message: "Email already in use" });
  }

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ username, email, phone, password: hashed });
  res.json({ message: "registered", userId: user._id });
}

export async function verify(req, res) {
  const { code } = req.body;
  if (code === "123456") return res.json({ verified: true });
  return res.status(400).json({ message: "Invalid code" });
}

export async function login(req, res) {
  const { login, password } = req.body;
  const user = await User.findOne({
    $or: [{ username: login }, { email: login }],
  });

  if (!user) {
    console.log("User not found attempt for login:", login);
    return res.status(400).json({ message: "User not found" });
  }

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    console.log("Wrong password attempt for user:", login);
    return res.status(400).json({ message: "Wrong password" });
  }

  const token = generateToken(user);
  res.json({ token, user });
}