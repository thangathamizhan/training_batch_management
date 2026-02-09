
import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema({
  traineeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Trainee",
    required: true
  },

  batchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Batch",
    required: true  
  },

  enrollmentDate: {
    type: Date,
    default: Date.now
  },

  status: {
    type: String,
    enum: ["Active", "Completed"],
    default: "Active"
  }

}, { timestamps: true });

export const Enrollment = mongoose.model("Enrollment", enrollmentSchema);
