import { assessment } from "../model/assessmentSchema.js";

export const createAssessment = async(req,res)=>{
    try{
       const {batchId, assessmentType, totalMarks, assessmentDate, traineeId}=req.body;

       console.log("batchId",batchId);
       console.log("assessmentType",assessmentType);
       console.log("totalMarks",totalMarks);
       console.log("assessmentDate",assessmentDate);
       console.log("traineeId",traineeId);

       
       if(!batchId || !assessmentType || totalMarks==null || !assessmentDate || !traineeId){
        return res.status(400).json({message: "Must fill all the fields"})
       }

       
       const newAssessment = await assessment.create({
        batchId,
        assessmentType,
        totalMarks,
        assessmentDate,
        traineeId
       });
       res.status(201).json({message: "New Assessment Created", data:newAssessment})
    }catch(error){
       console.error("Error Assessment",error.message);
       res.status(500).json({message:"Server Error"});
    }
}

export const getAllAssessment = async(req,res)=>{
    try{
        const assessments = await assessment.find()
        .populate({path:"batchId", select:"batchName startDate"})
        .populate({path:"traineeId"})
        res.status(200).json({message:"Fetched All Assessments", data:assessments})
    }
    catch(error){
        console.error("Error fetching branches",error.message);
        res.status(500).json({message:"Server Error"})
    }
}

export const updateAssessment = async(req,res)=>{
    try{
        const {id} = req.params;
        const updated = await assessment.findByIdAndUpdate(
            id,
            req.body,
            {new: true}
        );
        if(!updated){
            return res.status(404).json({message:"Assessment not found"});
        }
        res.status(200).json({message:"Assessment Updated", data:updated})
    }
    catch(error){
        console.error("Error updating Assessment",error.message);
        res.status(500).json({message:"Server error"});
    }
}

export const deleteAssessment = async(req,res)=>{
   try{
    const {id} = req.params;
    const deleted = await assessment.findByIdAndDelete(id);
    if(!deleted){
        return res.status(404).json({message:"Assessment not found"});
    }
    res.status(200).json({message:"Assessment deleted successfully", data:deleted});
   }
   catch(error){
     console.error("Error deleting assessment",error.message);
     res.status(500).json({message:"Server Error"});
   }
}

