import mongoose from "mongoose";
import dotenv from "dotenv";
import Candidate from "./models/candidate";

dotenv.config();
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/attendence";
const candidates = [
  { name: "John Doe", date: "2026-01-01", attended: false },
  { name: "Jane Smith", date: "2026-01-01", attended: false },
  { name: "Alice Johnson", date: "2026-01-02", attended: false },
  { name: "Bob Brown", date: "2026-01-03", attended: false },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI);

    console.log("Connected to MongoDB");

    await Candidate.deleteMany();
    console.log("Existing candidates removed");

    await Candidate.insertMany(candidates);
    console.log("Candidate data seeded");

    process.exit();
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
