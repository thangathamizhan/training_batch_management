import express from "express";
import { applyForCourse, deleteTrainee, getAllTrainees, getTraineeById, getTraineesByCourse, updateTrainee } from "../controller/traineeContoller.js";
import { auth } from "../middleware/auth.js";
import { authorize } from "../middleware/role.js";

export const traineeRoutes = express.Router();

traineeRoutes.post("/createTrainee",auth, applyForCourse);
traineeRoutes.get("/getTrainees",auth,authorize("ADMIN"), getAllTrainees

);
traineeRoutes.get('/getTraineeById/:ID',auth,getTraineeById)
traineeRoutes.get('/getTraineeByCourse',auth,getTraineesByCourse)
traineeRoutes.patch("/updateTrainee/:id",auth, updateTrainee);
traineeRoutes.delete("/deleteTrainee/:id",auth, deleteTrainee);

