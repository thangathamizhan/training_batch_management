import express from "express";
import { createTrainer, deleteTrainer, getAllTrainers, getSingleTrainer,  getTrainersBySkill, updateTrainer } from "../controller/tranierController.js";


export const trainerRoutes=express.Router();
trainerRoutes.post('/createTrainer',createTrainer);
trainerRoutes.get('/getAllTrainer',getAllTrainers)
trainerRoutes.get('/getSingleTrainer/:id',getSingleTrainer)
trainerRoutes.get('/getTrainersBySkill/:id',getTrainersBySkill)
trainerRoutes.patch('/updateTrainer/:id',updateTrainer)
trainerRoutes.delete('/deleteTrainer/:id',deleteTrainer)