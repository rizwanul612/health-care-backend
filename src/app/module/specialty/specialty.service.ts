import { Specialty } from "../../../generated/prisma/client"
import { prisma } from "../../lib/prisma"

const createSpecialtyService=async(payload:Specialty): Promise<Specialty>=>{
    const speciality=await prisma.specialty.create({
        data:payload
    })
    return speciality;
}
const getAllSpecilityService=async():Promise<Specialty[]>=>{
    const specialities=await prisma.specialty.findMany();
    return specialities;
}

const deleteSpecialtyService=async(id:string):Promise<Specialty>=>{
    const speciality=await prisma.specialty.delete({
        where:{
            id
        }
    })
    return speciality;
}

export const specialtyService={
    createSpecialtyService,
    getAllSpecilityService,
    deleteSpecialtyService
}