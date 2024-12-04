import { compare } from "bcrypt";
import managerModel from "../models/manager.model.js"
import jwt from "jsonwebtoken"




export default {
    signIn: async (req, res) => {
        try {
            const {Email, Password } = req.body;
            const manager =  await managerModel .findOne({Email:Email})
            if(!manager) throw new Error("the manager is not exist")
                
            const isPassworvalid = compare(manager, Password)     
            if(!isPassworvalid) throw new Error ("the password not valid")
            
            const token = jwt.sign(manager, process.env.JWT_SECRET, {
                expiresIn: 60 * 1 * 1
            })   
            res.cookie("token",token, {
                httpOnly: true,
                secure: true,
                maxAge: 1000 * 60 * 60 * 1
            })
            res.status(200).json({success: true, message: "Success Login manager", user});

   
        }catch(error) {
            console.log(error)
            res.status(401).json({success: false, massege: "not Success Login manager"})
            
        }
    },

}