import { Request, Response } from "express";
import { specialtyService } from "./specialty.service";

const createSpecialtyController=async(req:Request,res:Response)=>{
    try{
        const payload=req.body;
        const result=await specialtyService.createSpecialtyService(payload);
        res.status(201).json({
            success:true,
            message:"Specialty created successfully",
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

const getAllSpecialtyController=async(req:Request,res:Response)=>{
    try{
        const result=await specialtyService.getAllSpecilityService();
        res.status(200).json({
            success:true,
            message:"Specialties retrieved successfully",
            data:result
        })
    } catch (error: any) {
        res.status(500).json({
            success:false,
            message:"Error retrieving specialties",
            error:error.message
        })
    }
    }

const deleteSpecialtyController=async(req:Request,res:Response)=>{
    try{
        const { id } = req.params;
        const result=await specialtyService.deleteSpecialtyService(id as string);
        res.status(200).json({
            success:true,
            message:"Specialty deleted successfully",
            data:result
        })
    } catch (error: any) {
        res.status(500).json({
            success:false,
            message:"Error deleting specialty",
            error:error.message
        })
    }
}

export const specialtyControllerObj={
    createSpecialtyController,
    getAllSpecialtyController,
    deleteSpecialtyController
}