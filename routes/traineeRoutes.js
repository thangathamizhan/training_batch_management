import express from "express";
import { applyForCourse, deleteTrainee, getAllTrainees, getTraineeById, getTraineesByCourse, updateTrainee } from "../controller/traineeContoller.js";

export const traineeRoutes = express.Router();

traineeRoutes.post("/createTrainee", applyForCourse);
traineeRoutes.get("/getTrainees", getAllTrainees

);
traineeRoutes.get('/getTraineeById',getTraineeById)
traineeRoutes.get('/getTraineeByCourse',getTraineesByCourse)
traineeRoutes.patch("/updateTrainee/:id", updateTrainee);
traineeRoutes.delete("/deleteTrainee/:id", deleteTrainee);

