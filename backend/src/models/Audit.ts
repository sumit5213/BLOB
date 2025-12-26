import mongoose from "../db";

const schema = new mongoose.Schema({
  pdfId: String,
  originalHash: String,
  finalHash: String,
  signedAt: Date
});

export default mongoose.model("Audit", schema);