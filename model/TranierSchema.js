import mongoose from "mongoose";

const trainerSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userSchema",
      required: true
    },

   

    skillS: {
      type: [mongoose.Schema.Types.ObjectId],
      required: true,
      ref:"Skills"
    },

   

    proficiency: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced", "Expert"],
      required: true
    },

    experience: {
      type: Number,
      required: true
    }, 
    skillset: {
      type: [String], 
      required: true
    },
  },
  { timestamps: true }
);

export const Trainer = mongoose.model("Trainer", trainerSchema);
