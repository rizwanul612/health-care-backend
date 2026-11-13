import { Role,User,UserStatus } from "../../../generated/prisma/browser";
import { auth } from "../../lib/auth";
import { prisma } from "../../lib/prisma";

interface IRegistrationPayload {
    name: string;
    email: string;
    password: string;
}

const registrationServicePatient= async (payload : IRegistrationPayload)=>{
    const {name,email,password}=payload;
   
    const data= await auth.api.signUpEmail({
        body: {
            name,
            email,
            password
        }
    });
    if (!data.user) {
        throw new Error("Patient registration failed");
    }

    try{
        const patient=await prisma.$transaction(async (tx) => {
        const user = await tx.patient.create({
            data: {
                userId: data.user.id,
                name: payload.name,
                email:payload.email,
                
            }
        });
      
        return user;
    });
    return {...data,
              patient,
    }

    }catch(error){
        await prisma.user.delete({
            where:{
                id:data.user.id
            }
        })
        throw error;
        
    }

}


interface IloginUserPayload{
    email:string;
    password:string;
}
const loginUserservice=async (payloadr:IloginUserPayload)=>{
    const {email,password}=payloadr;
    const data = await auth.api.signInEmail({
          body:{
               email,
               password,
         }
   }) 
   if(data.user.status ===UserStatus.BLOCKED){
    throw new Error("User is Blocked")
   }
   if(data.user.isDeleted || data.user.status ===UserStatus.DELETED){
    throw new Error("User is Deleted")
   }
   return data;
}

export const AuthService={
    registrationServicePatient,
    loginUserservice
}

