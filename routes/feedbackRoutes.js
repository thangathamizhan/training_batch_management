import express from "express";
import { createfeedback, getfeedbackbyId, updateFeedback, deleteFeedback } from "../controller/feedbackController.js";
import {auth} from "../middleware/auth.js";
import { authorize } from "../middleware/role.js";
import { get } from "mongoose";

export const feedbackRoutes= express.Router();
feedbackRoutes.post('/createfeedback',createfeedback);
feedbackRoutes.get('/getfeedbackbyId/:id',getfeedbackbyId);
feedbackRoutes.patch('/updateFeedback/:id',updateFeedback);
feedbackRoutes.delete('/deleteFeedback/:id',deleteFeedback);