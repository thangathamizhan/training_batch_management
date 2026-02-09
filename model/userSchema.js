import mongoose from "mongoose";

const userSchemas = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    email:    { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    phoneNumber:{ type: String, required: true },

    role: {
      type: String,
      enum: ["ADMIN", "TRAINER", "USER"],
      default: "USER"
    }
  },
  { timestamps: true }
);

export const userSchema = mongoose.model("userSchema", userSchemas);
