import { userSchema } from "../model/userSchema.js"
import { generateToken } from "../utils/jwt.js";

//export const register = async (req, res) => {

/*   try {

      const { userName, email, password, phoneNumber } = req.body;

      const existingUser = await userSchema.findOne({ email })


      if (existingUser) {
         return res.status(409).json({ message: "user already exist" })
      }

      if (!userName || !email || !password || !phoneNumber) {


         return res.status(400).json({ message: "please fill out all the feild" })
      }

      const createUser = await userSchema.create({ userName: userName, email: email, password: password, phoneNumber: phoneNumber })


      res.status(201).json({ message: "successfully registered", data: createUser })

   } catch (error) {

      console.log("error while creating user",error.message);
      res.status(500).json({message:"server error"})
      

   }*/
  export const register = async (req, res) => {
   try {
      console.log("Incoming data:", req.body);

      const { userName, email, password, phoneNumber } = req.body;

      const existingUser = await userSchema.findOne({ email });

      if (existingUser) {
         return res.status(409).json({ message: "user already exist" });
      }

      if (!userName || !email || !password || !phoneNumber) {
         return res.status(400).json({ message: "please fill out all the field" });
      }

      const createUser = await userSchema.create({
        userName,
        email,
        password,
        phoneNumber
      });

      res.status(201).json({
        message: "successfully registered",
        data: createUser
      });

   } catch (error) {
      console.log("error while creating user:", error);
      res.status(500).json({ message: "server error" });
   }
};









export const login = async (req, res) => {

try {

   const{email,password}=req.body;


    if(email===process.env.ADMIN_EMAIL  && password===process.env.ADMIN_PASSWORD){

    const token =  generateToken({id:"ADMIN_ID",role:"ADMIN",email})

    return res.status(200).json({message:"Admin login success",token,user:{role:'ADMIN',email}})

    }


   const findUser = await userSchema.findOne({email})

   if(!findUser){

      return res.status(404).json("no account found ")
   }
   if(findUser.password!==password){

      return res.status(401).json({message:"invalid credentials"})


   }

   const token =generateToken({id:findUser._id,role:findUser.role,email:findUser.email})

   res.status(200).json({message:"login success",token,user:{id:findUser._id,role:findUser.role,email:findUser.email}})

   
} catch (error) {

   console.log("something error",error.message)
   res.status(500).json({message:"server error"})
   
}

}



