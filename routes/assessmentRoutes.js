import express from "express";
import { createAssessment, getAllAssessment, updateAssessment, deleteAssessment } from "../controller/assessmentController.js"; 
import {auth} from "../middleware/auth.js";
import { authorize } from "../middleware/role.js";


export const assessmentRoutes= express.Router();
assessmentRoutes.post("/createAssessment",auth, authorize("ADMIN"),createAssessment);
assessmentRoutes.get("/getAllAssessment",getAllAssessment);
assessmentRoutes.patch("/updateAssessment/:id",updateAssessment);
assessmentRoutes.delete("/deleteAssessment/:id",deleteAssessment);