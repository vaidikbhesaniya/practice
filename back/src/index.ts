import express from "express";
import mongoose from "mongoose";
import homeRoutes from "./routes/home";
import authRoutes from "./routes/auth";

import dotenv from "dotenv";

import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

// CORS configuration for credentials - must be before routes
const FRONT_ORIGIN = process.env.FRONT_ORIGIN || "http://localhost:5173";
app.use(
  cors({
    origin: FRONT_ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Parse cookies and JSON bodies
app.use(cookieParser());
app.use(express.json());
app.use("/api/home", homeRoutes);
app.use("/api", authRoutes);

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/attendence";
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
