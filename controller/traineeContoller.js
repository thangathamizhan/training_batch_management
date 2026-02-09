
import { Trainee } from "../model/traineeSchema.js";
import { User } from "../model/userSchema.js";           
import { CourseApplication } from "../model/courseApplication.js";    

export const applyForCourse = async (req, res) => {
  try {
    const {
      trainee_id,
      qualification,
      gender,
      address,
      courseId,
      
    } = req.body;

    
    if(!trainee_id || !qualification || !gender || !address || !courseId){
      return res.status(400).json({ message: "All fields are required" });
    }

    
    const user = await User.findOne({ trainee_id });
    if (!user){
      return res.status(404).json({ message: "User not found" });
    }


    let trainee = await Trainee.findOne({ trainee_id });

    if (!trainee){
      trainee = await Trainee.create({
        trainee_id,
        name: user.userName,
        email: user.email,
        phone: user.phoneNumber,
        qualification,
        gender,
        address  
      });
    }          

    
    const existingApp = await CourseApplication.findOne({
      traineeId: trainee._id,
      courseId
    });

    if (existingApp) {
      return res.status(409).json({ message: "Already applied for this course" });
    }

    const application = await CourseApplication.create({
      traineeId: trainee._id,
      courseId,
      mode
    });

    
    res.status(201).json({
      message: "Application submitted successfully",
      trainee,
      application
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};


export const getAllTrainees = async (req, res) => {
  try {
    const trainees = await Trainee.find();
    res.status(200).json({ count: trainees.length, data: trainees });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const getTraineeById = async (req, res) => {
  try {
    const { id } = req.params;

    const trainee = await Trainee.findById(id);
    if (!trainee) {
      return res.status(404).json({ message: "Trainee not found" });
    }

    res.status(200).json({ data: trainee });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



export const updateTrainee = async (req, res) => {
  try {
    const { id } = req.params;

    const trainee = await Trainee.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });

    if (!trainee) {
      return res.status(404).json({ message: "Trainee not found" });
    }

    res.status(200).json({ message: "Trainee updated", data: trainee });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const deleteTrainee = async (req, res) => {
  try {
    const { id } = req.params;

    const trainee = await Trainee.findByIdAndDelete(id);
    if (!trainee) {
      return res.status(404).json({ message: "Trainee not found" });
    }

    res.status(200).json({ message: "Trainee deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const getTraineesByCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    const applications = await CourseApplication.find({ courseId })
      .populate("traineeId")   
      .populate("courseId")   

    res.status(200).json({
      courseId,
      total: applications.length,
      trainees:applications
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};


