import { Gender } from "../../../generated/prisma/enums";

export interface IDoctorPayload{
    password:string;
    doctor:{
        name:string;
        email:string;
        profilePhoto?: string | null;
        contactNumber?: string | null;
        address?: string | null;
        registrationNumber: string;
        experiance?: number;
        gender: Gender;
        appointmentFee: number;
        qualification: string;
        currentWorkingPlace: string;
        designation: string;
       
    }
    doctorSpecialty: string[]
    
}