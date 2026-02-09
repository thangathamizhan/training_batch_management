import express from "express";
import { createSkill, deleteSkill, getAllSkills, getSkillById, updateSkill } from "../controller/skillController.js";
import { auth } from "../middleware.js/auth.js";
import { authorize } from "../middleware.js/role.js";


const skilroute = express.Router();

skilroute.post("/createSkills",auth,authorize("ADMIN"),createSkill); 
skilroute.get("/getskills",auth,authorize("ADMIN"), getAllSkills);
skilroute.get("/getskillById/:id",auth,authorize("ADMIN"), getSkillById);
skilroute.patch("/updateSkills/:id",auth,authorize("ADMIN"), updateSkill);
skilroute.delete("/deleteSkills/:id",auth,authorize("ADMIN"), deleteSkill);

export default skilroute;
