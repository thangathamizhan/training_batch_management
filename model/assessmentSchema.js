import mongoose from "mongoose";

const assessmentSchema= new mongoose.Schema(
    {
        batchId:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"Batch"
        },
        assessmentType:{
            type:String,
            required:true
        },
        totalMarks:{
            type:Number,
            required:true
        },
        assessmentDate:{
            type:Date,
            required:true
        },
        traineeId:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"Trainee"
        }

    },{ timestamps: true }
);

export const assessment = mongoose.model("assessment",assessmentSchema)


