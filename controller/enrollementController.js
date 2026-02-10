
import { Enrollment } from "../model/enrollment.model.js";
export const createEnrollment = async (req, res) => {
  try {
    const { traineeId, batchId } = req.body;

    if (!traineeId || !batchId) {
      return res.status(400).json({
        success: false,
        message: "traineeId and batchId are required"
      });
    }

  
    const existing = await Enrollment.findOne({ traineeId, batchId });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: "Trainee already enrolled in this batch"
      });
    }

    const enrollment = await Enrollment.create({
      traineeId,
      batchId
    });

    res.status(201).json({
      success: true,
      message: "Enrollment created successfully",
      data: enrollment
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Enrollment creation failed",
      error: error.message
    });
  }
};


export const getAllEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find()
      .populate("traineeId")   
      .populate("batchId");    

    res.status(200).json({
      success: true,
      count: enrollments.length,
      data: enrollments
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch enrollments",
      error: error.message
    });
  }
};


export const getEnrollmentById = async (req, res) => {
  try {
    const { id } = req.params;

    const enrollment = await Enrollment.findById(id)
      .populate("traineeId")
      .populate("batchId");

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: "Enrollment not found"
      });
    }

    res.status(200).json({
      success: true,
      data: enrollment
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch enrollment",
      error: error.message
    });
  }
};


export const updateEnrollmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; 

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "status is required"
      });
    }

    const updated = await Enrollment.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Enrollment not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Enrollment status updated",
      data: updated
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update status",
      error: error.message
    });
  }
};


export const deleteEnrollment = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Enrollment.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Enrollment not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Enrollment deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete enrollment",
      error: error.message
    });
  }
};


export const getEnrollmentsByTrainee = async (req, res) => {
  try {
    const { traineeId } = req.params;

    const enrollments = await Enrollment.find({ traineeId })
      .populate("batchId");

    res.status(200).json({
      success: true,
      data: enrollments
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch trainee enrollments",
      error: error.message
    });
  }
};



export const getEnrollmentsByBatch = async (req, res) => {
  try {
    const { batchId } = req.params;

    const enrollments = await Enrollment.find({ batchId })
      .populate("traineeId");

    res.status(200).json({
      success: true,
      data: enrollments
    })

  } catch(error){
    res.status(500).json({
      success: false,
      message: "Failed to fetch batch enrollments",
      error: error.message
    });
  }
};
