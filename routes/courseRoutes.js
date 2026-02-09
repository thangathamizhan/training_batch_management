import express from "express";
import { createCourse, deleteCourse, getCourse, updateCourse } from "../controller/courseController.js";
import { auth } from "../middleware.js/auth.js";
import { authorize } from "../middleware.js/role.js";




export const courseRoutes=express.Router();
courseRoutes.post('/createCourse',auth,authorize("ADMIN"),createCourse);
courseRoutes.get('/getCourse',auth,authorize("ADMIN"),getCourse);
courseRoutes.patch('/updateCourse/:id',auth,authorize("ADMIN"),updateCourse);
courseRoutes.delete('/deleteCourse/:id',auth,authorize("ADMIN"), deleteCourse);