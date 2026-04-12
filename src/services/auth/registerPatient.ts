/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import config from "@/config";
import z from "zod";
import { loginUser } from "./loginUser";
import { serverFetch } from "@/lib/server.fetch";
import { zodValidator } from "@/lib/zodValidatior";
import { registerPatientValidationZodSchema } from "@/zod/auth.validation";




export const registerPatient = async (_currentState: any, formData: any): Promise<any> => {
    try {
        console.log(formData.get("address"));
        const validationData = {
            name: formData.get('name'),
            address: formData.get('address'),
            email: formData.get('email'),
            password: formData.get('password'),
            confirmPassword: formData.get('confirmPassword'),
        }

        // const validatedFields = registerValidationZodSchema.safeParse(validationData);

        // if (!validatedFields.success) {
        //     return {
        //         success: false,
        //         errors: validatedFields.error.issues.map(issue => {
        //             return {
        //                 field: issue.path[0],
        //                 message: issue.message,
        //             }
        //         }
        //         )
        //     }
        // }


        if(zodValidator(validationData,registerPatientValidationZodSchema).success === false){
            return zodValidator(validationData,registerPatientValidationZodSchema)
        }

        const validatedData :any = zodValidator(validationData,registerPatientValidationZodSchema).data

        const registerData = {
            password: validatedData.get('password'),
            patient: {
                name: validatedData.get('name'),
                address: validatedData.get('address'),
                email: validatedData.get('email'),
            }
        }

        const newFormData = new FormData();

        newFormData.append("data", JSON.stringify(registerData));

        if(formData.get("file")){
            newFormData.append("file",formData.get("file") as Blob)
        }

        const res = await serverFetch.post("/user/create-patient", {
            body: newFormData,
        })

        const result = await res.json();


        if(result.success) {
            await loginUser(_currentState,formData)
        }

        return result;



    } catch (error: any) {

         if (error?.digest?.startsWith('NEXT_REDIRECT')) {
            throw error;
        }
        console.log(error);
        return { success:false, message: `${process.env.NODE_ENV === "production" ? "Registration failedAn error occurred during registration. You might have entered incorrect data." : error.message}`  };
    }
}