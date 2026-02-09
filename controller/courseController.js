import  { course }  from "../model/courseSchema.js";


export const createCourse=async(req ,res)=>{
    try {
    
        const {courseName, description,duration,level} =req.body;
        const existingcourseName= await course.findOne({courseName})
        if(existingcourseName){
            return res.status(409).json({message:"course already exist"})
        }
        if(!courseName || !description || ! duration || ! level){
            return res.status(400).json({message:"please fill out the all feild"});
        }
        const courseDetails= await course.create({courseName: courseName,description:description,duration:duration,level:level});
        res.status(201).json({message:"successfully created",data:courseDetails})
    } catch (error) {
        res.status(500).json({message:"server error"});
        
    }
}

export const getCourse=async(req,res)=>{
    try{
    const allCourse=await course.find();
    if(!allCourse){
        return res.status(404).json({message:"No Course details Found! "}) 
       }
       res.status(200).json({message:"Fetched! " ,data:allCourse} );
    }
    catch(error){
        res.status(500).json({message:"Server Error"});
    }
}
export const updateCourse=async(req,res)=>{
    const {id}=req.params;
    const {courseName,description,duration,level}=req.body;
    const UpdateFields=await course.findById(id);
    if(!UpdateFields){
        return res.status(404).json({message :"Course id not found"})
    }
    if(courseName){

        UpdateFields.courseName=courseName;
    }
     if(description){
        UpdateFields.description=description;
    }
     if(duration){
        UpdateFields.duration=duration;
    }
     if(level){
        UpdateFields.level=level;
    }
    

    await UpdateFields.save();
    res.status(200).json({message:"Updated successfully!"})
}
 
export const deleteCourse=async(req,res)=>{
    try{
        const {id}=req.params;
        const deleteCourseId=await course.findByIdAndDelete(id);
        if(!deleteCourseId){
            return res.status(400).json({message:"Id Not Found"});
        }
        res.status(205).json({message:"Id deleted Sucessfully"});
    }
    catch(error){
        return res.status(500).json({message:"server not found"})
    }
}