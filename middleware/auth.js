import jwt from 'jsonwebtoken'
import { userSchema } from '../model/userSchema.js';




export const auth =async(req,res,next)=>{


    try {

        const authHeader =req.headers.authorization;


        if(!authHeader || !authHeader.startsWith("Bearer ")){

            return res.status(401).json({message:"no token"})
        }
        const token =authHeader.split(" ")[1]   //bearer "dneifwenkewnkew"

        const BearerToken =jwt.verify(token,process.env.JWT_SECRET)

        if(BearerToken.role==='ADMIN'){

            req.user={
                id:BearerToken.id,
                role:"ADMIN",
                email:BearerToken.email
            }
return next() 
        }

        const user =await userSchema.findById(BearerToken.id).select('-password')

        if(!user){
            return res.status(401).json({message:"invalid token user"})
        }

        req.user =user
        next()
        
    } catch (error) {

        console.log("error in token",error.message);
        res.status(401).json({message:"invalid or expired token"})
        
    }
}