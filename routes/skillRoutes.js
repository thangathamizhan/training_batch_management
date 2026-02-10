import express from "express";
import { createSkill, deleteSkill, getAllSkills, getSkillById, updateSkill } from "../controller/skillController.js";
import { authorize } from "../middleware/role.js";
import { auth } from "../middleware/auth.js";



const skilroute = express.Router();

skilroute.post("/createSkill",auth,authorize("ADMIN"),createSkill); 
skilroute.get("/getAllskills",auth,authorize("ADMIN"), getAllSkills);
skilroute.get("/getskillById/:id",auth,authorize("ADMIN"), getSkillById);
skilroute.patch("/updateSkills/:id",auth,authorize("ADMIN"), updateSkill);
skilroute.delete("/deleteSkills/:id",auth,authorize("ADMIN"), deleteSkill);

export default skilroute;
