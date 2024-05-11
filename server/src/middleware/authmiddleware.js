import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/User.Model.js";
import { apiError } from "../utils/apiError.js";

export const verifyUser =asyncHandler(async(req,res,next)=>{
    try {
        const sessionuser=req.session.user;
        if(!sessionuser){
            console.log(sessionuser);
            throw new apiError("401 un authorised request")
        }
        const user = await User.findById(sessionuser._id).select("-password")
        if(!user){
         throw new apiError(401,"invalid session")
        }
        req.session.user=user;
        next()

        
    } catch (error) {
        
    }
})