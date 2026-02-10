import express from "express";
import { createTrainer, deleteTrainer, getAllTrainers, getSingleTrainer,  getTrainersBySkill, updateTrainer } from "../controller/tranierController.js";
import { auth } from "../middleware/auth.js";
import { authorize } from "../middleware/role.js";


export const trainerRoutes=express.Router();
trainerRoutes.post('/createTrainer',auth,authorize("ADMIN"),createTrainer);
trainerRoutes.get('/getAllTrainer',auth,authorize("ADMIN"),getAllTrainers)
trainerRoutes.get('/getSingleTrainer/:id',auth,authorize("ADMIN"),getSingleTrainer)
trainerRoutes.get('/getTrainersBySkill/:id',auth,authorize("ADMIN"),getTrainersBySkill)
trainerRoutes.patch('/updateTrainer/:id',auth,authorize("ADMIN"),updateTrainer)
trainerRoutes.delete('/deleteTrainer/:id',auth,authorize("ADMIN"),deleteTrainer)