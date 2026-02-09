import mongoose from "mongoose";

const schema = new mongoose.Schema({
  courseName: { type: String, required: true },
  description:{ type: String, required: true },
  duration:   { type: String, required: true },
  level:      { type: String, required: true },

  skills: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Skills",  
    required: true
  }]
});

export const course = mongoose.model("Course", schema);
