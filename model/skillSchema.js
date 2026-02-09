import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
  {
    skillName: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

export const Skill = mongoose.model("Skills", skillSchema);
