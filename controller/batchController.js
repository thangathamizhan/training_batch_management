import { Batch } from "../model/batch.js";


export const createBatch = async (req, res) => {
  try {
    const { batchName, startDate, endDate, mode, trainerId, courseId } = req.body;

    if (!batchName || !startDate || !endDate || !mode || !trainerId || !courseId) {
      return res.status(400).json({ message: "Must fill all the fields" });
    }

    const existing = await Batch.findOne({ batchName });
    if (existing) {
      return res.status(409).json({ message: "Batch name already exists, give new name" });
    }

    const newBatch = await Batch.create({
      batchName,
      startDate,
      endDate,
      mode,
      trainerId,
      courseId
    });

    res.status(201).json({ message: "New batch created", data: newBatch });
  } catch (error) {
    console.error("Error batch:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};


export const getAllBatches = async (req, res) => {
  try {
    const batches = await Batch.find()
      .populate({ path: "trainerId", select: "trainerName email" })
      .populate({ path: "courseId", select: "courseName description" });

    res.status(200).json({ message: "Fetched all batches", data: batches });
  } catch (error) {
    console.error("Error fetching batches:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};


export const getBatchById = async (req, res) => {
  try {
    const { id } = req.params;

    const batch = await Batch.findById(id)
      .populate({ path: "trainerId", select: "trainerName email" })
      .populate({ path: "courseId", select: "courseName description" });

    if (!batch) {
      return res.status(404).json({ message: "Batch not found" });
    }

    res.status(200).json({ message: "Batch fetched", data: batch });
  } catch (error) {
    console.error("Error fetching batch:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};


export const updateBatch = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await Batch.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!updated){
      return res.status(404).json({ message: "Batch not found" });
    }

    res.status(200).json({ message: "Batch updated", data: updated });

  } catch (error) {
    console.error("Error updating batch:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};



export const deleteBatch = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Batch.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Batch not found" });
    }

    res.status(200).json({ message: "Batch deleted successfully" });
  } catch (error) {
    console.error("Error deleting batch:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
