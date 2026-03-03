"use client";
import { useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { toast } from "sonner";


export default function LoginSuccessToast() {
    const searchParams = useSearchParams()

    useEffect(()=>{
        if(searchParams.get("loggedIn") === "true"){ 
            toast.success("You have logged in successfully.");
        }
    },[searchParams]) 
  return null
}
