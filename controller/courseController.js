import { course } from "../model/courseSchema.js";
 
 

export const createCourse = async (req, res) => {
  try {
    const { courseName, description, duration, level, skills } = req.body;
 
    if (!courseName || !description || !duration || !level || !skills) {
      return res.status(400).json({
        message: "Please fill all required fields"
      });
    }
 
    const existingCourse = await course.findOne({ courseName });
    if (existingCourse) {
      return res.status(409).json({
        message: "Course already exists"
      });
    }
 
    const courseDetails = await course.create({
      courseName,
      description,
      duration,
      level,
      skills
    });
 
    res.status(201).json({
      message: "Course created successfully",
      data: courseDetails
    });
 
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
 
 
 
// GET ALL COURSES
export const getCourse = async (req, res) => {
  try {
    const allCourses = await course.find().populate("skills");
 
    if (!allCourses.length) {
      return res.status(404).json({
        message: "No course details found"
      });
    }
 
    res.status(200).json({
      message: "Courses fetched successfully",
      data: allCourses
    });
 
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error" });
  }
};
// GET SINGLE COURSE BY ID
export const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;
 
    const singleCourse = await course
      .findById(id)
      .populate("skills");
 
    if (!singleCourse) {
      return res.status(404).json({
        message: "Course not found"
      });
    }
 
    res.status(200).json({
      message: "Course fetched successfully",
      data: singleCourse
    });
 
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
 
 
 
// UPDATE COURSE
export const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { courseName, description, duration, level, skills } = req.body;
 
    const existingCourse = await course.findById(id);
 
    if (!existingCourse) {
      return res.status(404).json({
        message: "Course not found"
      });
    }
 
    if (courseName) existingCourse.courseName = courseName;
    if (description) existingCourse.description = description;
    if (duration) existingCourse.duration = duration;
    if (level) existingCourse.level = level;
    if (skills) existingCourse.skills = skills;
 
    await existingCourse.save();
 
    res.status(200).json({
      message: "Course updated successfully",
      data: existingCourse
    });
 
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
 
 
 
// DELETE COURSE
export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
 
    const deletedCourse = await course.findByIdAndDelete(id);
 
    if (!deletedCourse) {
      return res.status(404).json({
        message: "Course not found"
      });
    }
 
    res.status(200).json({
      message: "Course deleted successfully"
    });
 
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
 