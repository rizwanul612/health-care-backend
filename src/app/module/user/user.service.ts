
import { Role, Specialty } from "../../../generated/prisma/client"
import { auth } from "../../lib/auth";
import { prisma } from "../../lib/prisma"
import { IDoctorPayload } from "./user.interface";



const createDoctorService=async(payload:IDoctorPayload)=>{
    const specialities: Specialty[]= [];

    for(const specialtyId of payload.doctorSpecialty){
        const specialty = await prisma.specialty.findUnique({
            where:{
                id:specialtyId
            }
        })
        if(!specialty){
            throw new Error(`speciality not found`)
        }
        specialities.push(specialty)
    }
    const userExists =await prisma.user.findUnique({
        where:{
            email:payload.doctor.email
        }
    })
    if(userExists){
        throw new Error ("User with this email already exist")
    }
    const userData= await auth.api.signUpEmail({
        body:{
            email:payload.doctor.email,
            password:payload.password,
            role:Role.DOCTOR,
            name:payload.doctor.name,
            needPasswordChange:true,
        }
    })

    try{
        const result = await prisma.$transaction(async(tx)=>{
            const doctordata=await tx.doctor.create({
                data:{
                    userId:userData.user.id,
                    ...payload.doctor,
                }
            })
            const doctorspecialtyData= specialities.map((specialties)=>{
                return{
                    doctorId:doctordata.id,
                    specialtyId:specialties.id
                }
            })
            await tx.doctorSpecialty.createMany({
                data:doctorspecialtyData
            })
            
            const doctor = await tx.doctor.findUnique({
                where:{
                    id:doctordata.id
                },
                select:{
                    id: true,
                    userId:true,
                            name:true,
                            email:true,
                            profilePhoto: true,
                            contactNumber: true,
                            address: true,
                            registrationNumber:true,
                            experiance: true,
                            gender: true,
                            appointmentFee: true,
                            qualification: true,
                            currentWorkingPlace: true,
                            designation: true,
                            createdAt:true,
                            updatedAt:true,
                            user:{
                                select:{
                                    id:true,
                                    email:true,
                                    role:true,
                                    status:true,
                                    emailVerified:true,
                                    image:true,
                                    isDeleted:true,
                                    deletedAt:true,
                                    createdAt:true,
                                    updatedAt:true

                                }
                            },
                            
                            doctorSpecialty:{
                                select:{
                                    specialty:{
                                        select:{
                                           title:true,
                                           id:true
                                        }
                                    }
                                    
                                }
                            }
                           
                }
            })
            return doctor
        })
        return result;

    }catch(error){
        await prisma.user.delete({
            where:{
                id:userData.user.id
            }
        })
        throw error;
    }
}


export const userService={
    createDoctorService
}





