
/*import express from "express";
import {
  createCourse,
  deleteCourse,
  getCourse,
  getSingleCourse,
  updateCourse,
} from "../controller/courseController.js";

export const courseRoutes = express.Router();

courseRoutes.post("/createCourse", createCourse);
courseRoutes.get("/getCourse", getCourse);
courseRoutes.get("/getSingleCourse/:id", getSingleCourse);
courseRoutes.patch("/updateCourse/:id", updateCourse);
courseRoutes.delete("/deleteCourse/:id", deleteCourse);*/
import express from "express";
import {
  createCourse,
  deleteCourse,
  getCourse,
  getSingleCourse,
  updateCourse,
} from "../controller/courseController.js";

const courseRoute = express.Router();

courseRoute.post("/createCourse", createCourse);
courseRoute.get("/getCourse", getCourse);
courseRoute.get("/getSingleCourse/:id", getSingleCourse);
courseRoute.patch("/updateCourse/:id", updateCourse);
courseRoute.delete("/deleteCourse/:id", deleteCourse);

export { courseRoute };

