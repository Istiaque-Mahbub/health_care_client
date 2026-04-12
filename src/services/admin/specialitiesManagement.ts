"use server"

import { serverFetch } from "@/lib/server.fetch"
import { zodValidator } from "@/lib/zodValidatior"
import { createSpecialityZodSchema } from "@/zod/specalites.validation"





export async function  createSpeciality(_prevState:any,fromData:FormData) {


    try {
        const payload = {
        title: fromData.get("title") as string
    }

    // const validatedPayload = createSpecialityZodSchema.safeParse(payload)

    // if(!validatedPayload.success){
    //     return {
    //         success:false,
    //         errors: validatedPayload.error.issues.map(issue=>{
    //             return{
    //                 field:issue.path[0],
    //                 message: issue.message
    //             }
    //         })
    //     }
    // }


    if(zodValidator(payload,createSpecialityZodSchema).success === false){
        return zodValidator(payload,createSpecialityZodSchema)
    }

    const validatedPayload = zodValidator(payload,createSpecialityZodSchema)

    const newFormData = new FormData()
    newFormData.append("data",JSON.stringify(validatedPayload.data))

    if(fromData.get("file")){
        newFormData.append("file",fromData.get('file') as Blob)
    }

    const response  = await serverFetch.post("/specialties", {
        body:fromData
    })

    const result = await response.json()

    return result


    } catch (error:any) {
        console.log(error)
        return {
            success:false,
            message:error.message || "Something went wrong"
        }
    }
}
export async function  getSpeciality() {
try {
    const response = await serverFetch.get("/specialties")
    const result = await response.json()
    return result
} catch (error:any) {
    console.log(error)
    return{
        success:false,
        message:error.message || "Something went wrong"
    }
}
}
export async function  deleteSpeciality(id:string) {
try {

    const response = await serverFetch.delete(`/specialties/${id}`)
    const result = await response.json()
    return result
} catch (error:any) {
    return{
        success:false,
        message:error.message || "Something went wrong"
    }
}
}