
import mongoose from "mongoose";

const traineeSchema = new mongoose.Schema(
  {
    trainee_id: {
      type:mongoose.Schema.Types.ObjectId,
      ref:"userSchema",
      unique: true,
      required: true
      
    },

    name:{
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },

    phone: {
      type: String,
      required: true
    },

    qualification: {
      type: String,
      required: true
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true
    },

    address: {
      type: String,
      required: true
    },

    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",   
      required: true
    }
  },
  {
    timestamps: true
  }
);

export const Trainee = mongoose.model("Trainee", traineeSchema);
