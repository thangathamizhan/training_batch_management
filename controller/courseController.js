import mongoose from "mongoose";
import { course } from "../model/courseSchema.js";




export const createCourse = async (req, res) => {
  try {
    const { courseName, description, duration, level, skills } = req.body;

    // validation
    if (!courseName || !description || !duration || !level || !skills || skills.length === 0) {
      return res.status(400).json({ message: "Please fill all fields including skills" });
    }

    // check duplicate course
    const existingCourse = await course.findOne({ courseName });
    if (existingCourse) {
      return res.status(409).json({ message: "Course already exists" });
    }

    // validate skill ObjectIds
    const validSkills = skills.every(id => mongoose.Types.ObjectId.isValid(id));
    if (!validSkills) {
      return res.status(400).json({ message: "Invalid skill IDs" });
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
    console.error("Create Course Error:", error);
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
    res.status(500).json({ message: "Server Error" ,error:error.message });
  }
};


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

  

