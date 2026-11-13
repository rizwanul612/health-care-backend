import { Request, Response } from "express";

import { userService } from "./user.service";

const createUserController=async(req:Request,res:Response)=>{
    try{
        const payload=req.body;
        const result=await userService.createDoctorService(payload);
        res.status(201).json({
            success:true,
            message:"Doctor created successfully",
            data:result
        })
    } catch (error: any) {
        res.status(500).json({
            success:false,
            message:"Error creating specialty",
            error:error.message
        })
    }
}



export const userControllerObj={
    createUserController
}