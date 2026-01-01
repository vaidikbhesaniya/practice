import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user";
import bcrypt from "bcryptjs";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";
// Helper: set JWT cookie
function setTokenCookie(res: Response, token: string) {
  res.cookie("token", token, {
    httpOnly: true,
    secure: false, // Set to false for localhost development
    sameSite: "lax",
    maxAge: 1000 * 60 * 60, // 1 hour
    path: "/",
  });
}

export async function register(req: Request, res: Response) {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "Email and password required" });
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ error: "User already exists" });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();
    res.status(201).json({ id: user._id, email: user.email });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: "Invalid credentials" });
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });
    setTokenCookie(res, token);
    res.status(200).json({ success: true, message: "Login successful" });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error" });
  }
}

export function logout(req: Request, res: Response) {
  res.clearCookie("token");
  res.json({ success: true });
}

export function checkAuth(req: Request, res: Response) {
  const token = req.cookies?.token;
  if (!token) return res.json({ authenticated: false });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ authenticated: true, user: decoded });
  } catch {
    res.json({ authenticated: false });
  }
}
