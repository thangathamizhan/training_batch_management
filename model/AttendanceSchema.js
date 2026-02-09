import mongoose from "mongoose";
 
const Attendanceschema= new mongoose.Schema(
  {
   
     enrollment_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Enrollment",  
      required: true
    },
    batch_id:{
       type: mongoose.Schema.Types.ObjectId,
      ref: "batch",  
      required: true
    },
    session_date: {
      type: Date,
      required: true
    },
    status: {
      type: String,
      enum:['Present', 'Absent'],
      required: true
    },
   
remarks: {
  type: String,
  default: ""
}
  },
  { timestamps: true }
);
 
export const Attendance = mongoose.model("Attendance", Attendanceschema);