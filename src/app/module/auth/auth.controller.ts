import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponce";


const registrationControllerPatient = catchAsync(
    async (req: Request, res: Response) => {
          const payload=req.body; 
          const result=await AuthService.registrationServicePatient(payload);
          sendResponse(res,{
               httpStatusCode:201,
               success:true,
               message:"patient registration created successfully",
               data:result  
          })     
}
)

const loginUserController = catchAsync(
    async (req: Request, res: Response) => {
          const payload=req.body;   
          const result=await AuthService.loginUserservice(payload);
          sendResponse(res,{
               httpStatusCode:201,
               success:true,
               message:"patient login successfully",
               data:result
              
          })    
}
)

export const AuthController={
    registrationControllerPatient,
    loginUserController
}