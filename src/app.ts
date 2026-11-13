import express, { Application, NextFunction, Request, Response } from "express";
import { IndexRouters } from "./app/routes";
import { envVers } from "./config/env";
const app: Application = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/v1",IndexRouters)
//

// app.use('/api/v1/specialties', SpecialtyRoutes);
//
//gloval error handler
app.use((err:any,req:Request,res:Response,next:NextFunction)=>{
    if(envVers.NODE_ENV==='development'){
          console.log("Error From Global ERROR",err)
    }
    
    res.status(500).json({
        success:false,
        message:'Internal Server Error',
        error:err.message,
    })
})
//not found page global
app.use((req:Request,res:Response)=>{
    
    res.status(404).json({
        success:false,
        message:`Route Not Found`,
        // message:`Route Not Found at ${req.originalUrl}`,
    
    })
})
export default app;