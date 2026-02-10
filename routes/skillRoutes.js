import express from "express";
import { createSkill, deleteSkill, getAllSkills, getSkillById, updateSkill } from "../controller/skillController.js";



const skilroute = express.Router();

skilroute.post("/createSkill",createSkill); 
skilroute.get("/getAllskills", getAllSkills);
skilroute.get("/getskillById/:id", getSkillById);
skilroute.patch("/updateSkills/:id", updateSkill);
skilroute.delete("/deleteSkills/:id", deleteSkill);

export default skilroute;
