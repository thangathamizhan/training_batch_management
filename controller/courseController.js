/*import  { course }  from "../model/courseSchema.js";


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
}*/
import { course } from "../model/courseSchema.js";


// CREATE COURSE
export const createCourse = async (req, res) => {
  try {
    const { courseName, description, duration, level, skills } = req.body;

    // validation
    if (!courseName || !description || !duration || !level || !skills || skills.length === 0) {
      return res.status(400).json({
        message: "Please fill all fields including skills",
      });
    }

    // check duplicate course
    const existingCourse = await course.findOne({ courseName });
    if (existingCourse) {
      return res.status(409).json({ message: "Course already exists" });
    }

    // validate skill ObjectIds
    const validSkills = skills.every(id =>
      mongoose.Types.ObjectId.isValid(id)
    );

    if (!validSkills) {
      return res.status(400).json({
        message: "Invalid skill IDs",
      });
    }

    // create course
    const courseDetails = await course.create({
      courseName,
      description,
      duration,
      level,
      skills,
    });

    res.status(201).json({
      message: "Course created successfully",
      data: courseDetails,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// GET ALL COURSES
export const getCourse = async (req, res) => {
  try {
    const allCourse = await course.find().populate("skills");

    res.status(200).json({
      message: "Courses fetched successfully",
      data: allCourse,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// GET SINGLE COURSE
export const getSingleCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const singleCourse = await course.findById(id).populate("skills");

    if (!singleCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({
      message: "Course fetched",
      data: singleCourse,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// UPDATE COURSE
export const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { courseName, description, duration, level, skills } = req.body;

    if (skills) {
      const validSkills = skills.every(skillId =>
        mongoose.Types.ObjectId.isValid(skillId)
      );

      if (!validSkills) {
        return res.status(400).json({ message: "Invalid skill IDs" });
      }
    }

    const updatedCourse = await course.findByIdAndUpdate(
      id,
      { courseName, description, duration, level, skills },
      { new: true, runValidators: true }
    );

    if (!updatedCourse) {
      return res.status(404).json({ message: "Course id not found" });
    }

    res.status(200).json({
      message: "Course updated successfully",
      data: updatedCourse,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// DELETE COURSE
export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCourse = await course.findByIdAndDelete(id);

    if (!deletedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({
      message: "Course deleted successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error" });
  }
};
