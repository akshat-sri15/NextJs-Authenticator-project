"use client";
import React,{useEffect} from "react";
import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import { log } from "console";
import { useRouter } from "next/navigation";
export default function ProfilePage(){
    const [data,setData]=useState("");
    const router = useRouter();
    const logout =()=>{
        try{
            axios.get("/api/users/logout");
            toast.success("Logout successful");
            router.push("/login");
        }
        catch(error:any){
            console.log(error);
            toast.error(error.response.data.message || "Something went wrong");
        }
    }
    const getUserData=async()=>{
        try{
            const response=await axios.get("/api/users/me");
            console.log("On inspect ",response.data);
            setData(response.data.data.username);
        }
        catch(error:any){
            console.log(error);
            toast.error(error.response.data.message || "Something went wrong");
        }
    }
    useEffect(()=>{
        getUserData();
    },[])

    return(
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            <h1 className="text-4xl font-bold text-white">
               Hey {data} Welcome to your profile!
            </h1>
            <button onClick={logout}
            className="mt-6 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
                Logout
            </button>
        </div>
    )
}
