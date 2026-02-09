import { Trainer } from "../model/TranierSchema.js"; 
import { userSchema } from "../model/userSchema.js";

export const createTrainer = async (req, res) => {
  try {
    const {
      trainerName,
      email,
      password,
      phoneNumber,
      skillSet,
      skills,        
      proficiency,
      experience
    } = req.body;

  
    if (
      !trainerName ||
      !email ||
      !password ||
      !phoneNumber ||
      !skillSet ||
      !skills ||
      !proficiency ||
      !experience
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    
    const existingUser = await userSchema.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists with this email" });
    }

    
    const newUser = await userSchema.create({
      userName: trainerName,
      email,
      password,             
      phoneNumber,
      role: "TRAINER"
    });

    
  
    const trainer = await Trainer.create({
      userId: newUser._id,     
      skillS: skills,          
      proficiency,
      experience,
      skillset: skillSet     
    });

    res.status(201).json({
      message: "Trainer created successfully",
      user: {
        id: newUser._id,
        userName: newUser.userName,
        email: newUser.email,
        phoneNumber: newUser.phoneNumber,
        role: newUser.role
      },
      trainer
    });

  } catch (error) {
    console.log("Create trainer error:", error.message);
    res.status(500).json({
      message: "Server Error",
      error: error.message
    });
  }
};


export const getAllTrainers = async (req, res) => {
  try {
    const trainers = await Trainer.find()
      .populate("userId", "userName email phoneNumber role");

    if (!trainers || trainers.length === 0) {
      return res.status(404).json({
        message: "No trainers found"
      });
    }

    res.status(200).json({
      message: "Trainers fetched successfully",
      total: trainers.length,
      data: trainers
    });

  } catch (error) {
    console.log("Get all trainers error:", error.message);
    res.status(500).json({
      message: "Server Error"
    });
  }
};


export const getSingleTrainer = async (req, res) => {
  try {
    const { id } = req.params;

    const trainer = await Trainer.findById(id)
      .populate("userId", "userName email phoneNumber role");

    if (!trainer) {
      return res.status(404).json({
        message: "Trainer not found"
      });
    }

    res.status(200).json({
      message: "Trainer fetched successfully",
      data: trainer
    });

  } catch (error) {
    console.log("Get single trainer error:", error.message);
    res.status(500).json({
      message: "Server Error"
    });
  }
};
export const getTrainersBySkill = async (req, res) => {
  try {
    console.log("PARAMS:", req.params);

    const { id } = req.params;

    const trainers = await Trainer.find({
      skillS: id
    }).populate("userId","userName");

    console.log("FOUND:", trainers.length);

    res.status(200).json({
      total: trainers.length,
      data: trainers
    });

  } catch (error) {
    console.log("ERROR:", error);
    res.status(500).json({ message: "Server Error" });
  }
};


export const updateTrainer = async (req, res) => {
  try {
    const { id } = req.params;
 
    const {
      trainerName,
      email,
      password,
      phoneNumber,
      skillSet,
      skills,
      proficiency,
      experience
    } = req.body;
 
    // 1️⃣ Find trainer
    const trainer = await Trainer.findById(id);
    if (!trainer) {
      return res.status(404).json({ message: "Trainer not found" });
    }
 
    // 2️⃣ Update user
    await userSchema.findByIdAndUpdate(
      trainer.userId,
      {
        ...(trainerName && { userName: trainerName }),
        ...(email && { email }),
        ...(password && { password }),
        ...(phoneNumber && { phoneNumber })
      },
      { new: true, runValidators: true }
    );
 
    // 3️⃣ Update trainer
    const updatedTrainer = await Trainer.findByIdAndUpdate(
      id,
      {
        ...(skills && { skillS: skills }),
        ...(skillSet && { skillset: skillSet }),
        ...(proficiency && { proficiency }),
        ...(experience && { experience })
      },
      { new: true, runValidators: true }
    ).populate("userId", "userName email phoneNumber role");
 
    res.status(200).json({
      message: "Trainer updated successfully",
      data: updatedTrainer
    });
 
  } catch (error) {
    console.log("Update trainer error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};
 


export const deleteTrainer = async (req, res) => {
  try {
    const { id } = req.params;

    
    const trainer = await Trainer.findById(id);
    if (!trainer) {
      return res.status(404).json({ message: "Trainer not found" });
    }

    await Trainer.findByIdAndDelete(id);

    await userSchema.findByIdAndDelete(trainer.userId);

    res.status(200).json({
      message: "Trainer and user deleted successfully"
    });

  } catch (error) {
    console.log("Delete trainer error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};








