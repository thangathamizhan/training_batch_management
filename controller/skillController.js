import { Skill } from "../model/skillSchema.js";

export const createSkill = async (req, res) => {
  try {
    const { skillName, description, category } = req.body;

    
    if (!skillName || !description || !category) {
      return res.status(400).json({
        message: "All fields are required",
        missing: {
          skillName: !skillName,
          description: !description,
          category: !category
        }
      });
    }

    const skill = await Skill.create({ skillName, description, category });

    res.status(201).json({
      message: "Skill created successfully",
      data: skill
    });

  } catch (error) {
    console.log("error", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllSkills = async (req, res) => {
  try {
    const skills = await Skill.find();

    res.status(200).json({
      message: "Skills fetched successfully",
      data: skills
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getSkillById = async (req, res) => {
  try {
    const { id } = req.params;

    const skill = await Skill.findById(id);

    if (!skill) {
      return res.status(404).json({ message: "Skill not found" });
    }

    res.status(200).json({
      message: "Skill fetched successfully",
      data: skill
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateSkill = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedSkill = await Skill.findByIdAndUpdate(
      id,
      { $set: req.body },  
      {
        new: true,         
        runValidators: true 
      }
    );

    if (!updatedSkill) {
      return res.status(404).json({ message: "Skill not found" });
    }

    res.status(200).json({
      message: "Skill updated successfully",
      data: updatedSkill
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteSkill = async (req, res) => {
  try {
    const { id } = req.params;

    const skill = await Skill.findByIdAndDelete(id);

    if (!skill) {
      return res.status(404).json({ message: "Skill not found" });
    }

    res.status(200).json({
      message: "Skill deleted successfully"
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
