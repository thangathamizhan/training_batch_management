import express from "express";
import { applyForCourse, deleteTrainee, getAllTrainees, getTraineeById, getTraineesByCourse, updateTrainee } from "../controller/traineeContoller.js";
import { auth } from "../middleware/auth.js";
import { authorize } from "../middleware/role.js";

export const traineeRoutes = express.Router();

traineeRoutes.post("/createTrainee",auth, applyForCourse);
traineeRoutes.get("/getTrainees",auth,authorize("ADMIN"), getAllTrainees

);
traineeRoutes.get('/getTraineeById/:ID',auth,authorize("ADMIN"),getTraineeById)
traineeRoutes.get('/getTraineeByCourse',auth,authorize("ADMIN"),getTraineesByCourse)
traineeRoutes.patch("/updateTrainee/:id",auth,authorize("ADMIN"), updateTrainee);
traineeRoutes.delete("/deleteTrainee/:id",auth,authorize("ADMIN"), deleteTrainee);

