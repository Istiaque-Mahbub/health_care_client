"use server"

import { UserInfo } from "@/types/user.interface"
import { getCookie } from "./tokenHandelers"
import jwt, { JwtPayload } from "jsonwebtoken"
import config from "@/config"




export const getUserInfo = async (): Promise<UserInfo | null> => {
try {
    const accessToken = await getCookie("accessToken")
    if (!accessToken) {
       return null
    }
    const verifiedToken = jwt.verify(accessToken, config.jwtSecret as string) as JwtPayload
    if(!verifiedToken) return null

    const userInfo: UserInfo = {
        name: verifiedToken.name|| "Unknown User",
        email: verifiedToken.email,
        role: verifiedToken.role
    }
    return userInfo

} catch (error:any) {
    console.log(error)
     return null
   
}
}
