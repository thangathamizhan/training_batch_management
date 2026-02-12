import mongoose from "mongoose";

const batchSchema = new mongoose.Schema(
  {
    batchName: { 
      type: String, 
      required: true, 
      unique: true 
    },

    startDate: { 
      type: Date, 
      required: true 
    },

    endDate: { 
      type: Date, 
      required: true 
    },

    mode: { 
      type: String, 
      enum: ["ONLINE", "OFFLINE"], 
      required: true 
    },

    trainerId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Trainer", 
      required: true 
    },

    courseId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Course",
      required: true 
    }
  },
  { timestamps: true } 
);


export const Batch = mongoose.model("Batch", batchSchema);
