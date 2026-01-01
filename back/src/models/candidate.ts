import mongoose, { Document, Schema } from "mongoose";

export interface ICandidate extends Document {
  name: string;
  date: string;
  attended: boolean;
}

const CandidateSchema = new Schema<ICandidate>({
  name: { type: String, required: true },
  date: { type: String, required: true },
  attended: { type: Boolean, default: false },
});

const Candidate = mongoose.model<ICandidate>("Candidate", CandidateSchema);
export default Candidate;
