import mongoose from "mongoose";

const courseApplicationSchema = new mongoose.Schema(
  {
    traineeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trainee",
      required: true
    },

    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true
    },

  

    appliedDate: {
      type: Date,
      default: Date.now
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending"
    }
  },
  {
    timestamps: true
  }
);

export const CourseApplication = mongoose.model(
  "CourseApplication",
  courseApplicationSchema
)
