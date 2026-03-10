import {feedbackmodel} from '../model/feedBackSchema.js';
 
export const createfeedback = async (req, res) => {
  try {
    const { traineeId, batchId, rating, comments } = req.body;
     console.log("batchId",batchId);
       console.log("traineeid",traineeId);
       console.log("rating",rating);
       console.log("comments",comments);
     
    if (!traineeId || !batchId || !rating || !comments) {
      return res.status(400).json({ message: "All fields are required" });
    }
 
    const feedback = await feedbackmodel.create({
      traineeId,
      batchId,
      rating,
      comments
    });
 
    res.status(201).json({
      message: "Feedback created successfully",
      data: feedback
    });
 
  } catch (error) {
    console.error("Error Message",error.message);
    res.status(500).json({ message: error.message });
  }
};
 
 
export const getfeedbackbyId = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {

      return res.status(400).json({ message: "Feedback ID is required" });
    }
    const feedback = await feedbackmodel.findById(id)
       
    
 
    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }
 
    res.status(200).json({
      message: "Feedback fetched successfully",
      data: feedback
    });
 
  } catch (error) {
    console.error("Error Message",error.message);
    res.status(500).json({ message: error.message });
  }
};
 
 
export const updateFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const { traineeId, batchId, rating, comments } = req.body;
 
    if (!id) {
      return res.status(400).json({ message: "Feedback ID is required" });
    }
 
    const updatedFeedback = await feedbackmodel.findByIdAndUpdate(
      id,
      {
        traineeId,
        batchId,
        rating,
        comments
      },
      { new: true }  
    );
 
    if (!updatedFeedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }
 
    res.status(200).json({
      message: "Feedback updated successfully",
      data: updatedFeedback
    });
 
  } catch (error) {
    console.error("Error Messaage",error.message);
    res.status(500).json({ message: error.message });
  }
};
 
export const deleteFeedback = async (req, res) => {
  try {
    const { id } = req.params;
 
    if (!id) {
      return res.status(400).json({ message: "Feedback ID is required" });
    }
 
    const deletedFeedback = await feedbackmodel.findByIdAndDelete(id);
 
    if (!deletedFeedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }
 
    res.status(200).json({
      message: "Feedback deleted successfully"
    });
 
  } catch (error) {
    console.error("Error Message",error.message);
    res.status(500).json({ message: error.message });
  }
};