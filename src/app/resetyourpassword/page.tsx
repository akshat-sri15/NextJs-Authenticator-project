"use client";

import {useEffect, useState} from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
export default function ResetPasswordPage(){
    const router = useRouter();
    const [email, setEmail]=useState("");
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] =useState(false);
    const onResetPassword = async () => {
        try{
            setLoading(true);
            const response = await axios.post("/api/users/resetyourpassword", { email });
            console.log("RESPONSE:", response); 
            toast.success(response.data.message);
        } catch(error:any){
            toast.error(error.response.data.message || "Something went wrong");
            console.log(error);
        } finally{
            setLoading(false);
        }
    }
    useEffect(() => {
        if(email){
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [email]);

    return(
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            
            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-[350px] flex flex-col gap-4 border border-white/20">
                
                <h1 className="text-3xl font-bold text-white text-center">
                    {loading ? "Loading..." : "Reset Password"}
                </h1>
                <input 
                    type="email" 
                    placeholder="Email" 
                    className="p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-400 transition"
                    onChange={(e) => setEmail(e.target.value)} 
                />

                <button
                    className="bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition disabled:bg-gray-400"
                    onClick={onResetPassword}
                    disabled={buttonDisabled || loading}
                >
                    {loading ? "Processing..." : "Send Reset Link"}
                </button>

                <p className="text-gray-300 text-sm text-center">
                    Remembered your password?{" "}
                    <Link href="/login" className="text-blue-400 hover:underline">
                        Log In
                    </Link>
                </p>
            </div>
        </div>
    )
}