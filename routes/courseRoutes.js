
import express from "express";

import { createCourse, deleteCourse, getCourse, getSingleCourse, updateCourse } from "../controller/courseController.js";
import { auth } from "../middleware/auth.js";
import { authorize } from "../middleware/role.js";
 
 
 
 
export const courseRoutes=express.Router();
courseRoutes.post('/createCourse',auth,authorize("ADMIN"),createCourse);
courseRoutes.get('/getCourse',auth,authorize("ADMIN"),getCourse);
courseRoutes.get('/getCourseById/:id',auth,authorize("ADMIN"),getSingleCourse)
courseRoutes.patch('/updateCourse/:id',auth,authorize("ADMIN"),updateCourse);
courseRoutes.delete('/deleteCourse/:id',auth,authorize("ADMIN"), deleteCourse);

