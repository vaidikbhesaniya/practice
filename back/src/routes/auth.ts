import { Router } from "express";
import {
  register,
  login,
  logout,
  checkAuth,
} from "../controllers/authController";
import Candidate from "../models/candidate"; // Updated import for Candidate model

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/check-auth", checkAuth);

// Fetch candidates for a specific date
router.get("/candidates", async (req, res) => {
  const { date } = req.query;
  try {
    const candidates = await Candidate.find({ date });
    res.status(200).json(candidates);
  } catch (error) {
    res.status(500).json({ message: "Error fetching candidates", error });
  }
});

// Update attendance status
router.post("/candidates/attendance", async (req, res) => {
  const { id, attended } = req.body;
  try {
    await Candidate.findByIdAndUpdate(id, { attended });
    res.status(200).json({ message: "Attendance updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating attendance", error });
  }
});

export default router;
