"use client";
import Link from "next/link";
import React,{use, useEffect} from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
export default function LoginPage(){
     const router = useRouter();
    const [User, setUser] = React.useState({
        email: "",
        password: "",
    });
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const onLogin = async () => {
        try{
            setLoading(true);
            const response = await axios.post("/api/users/login", User);
            console.log("RESPONSE:", response); 
            console.log("hi hi hi hi");
            toast.success(response.data.message);
            router.push("/profile");
        } catch(error:any){
            toast.error(error.response.data.message || "Something went wrong");
            console.log(error);
        } finally{
            setLoading(false);
        }
    }
    useEffect(() => {
        if(User.email && User.password){
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [User]);

    return(
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            
            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-[350px] flex flex-col gap-4 border border-white/20">
                
                <h1 className="text-3xl font-bold text-white text-center">
                    {loading ? "Loading..." : "Log In"}
                </h1>
                <input 
                    type="email" 
                    placeholder="Email" 
                    className="p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-400 transition"
                    onChange={(e) => setUser({...User, email: e.target.value})} 
                />

                <input 
                    type="password" 
                    placeholder="Password" 
                    className="p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-400 transition"
                    onChange={(e) => setUser({...User, password: e.target.value})} 
                />

                <button 
                    className="bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition duration-200 shadow-md"
                    onClick={onLogin}
                >
                    {buttonDisabled ? "Fill all the fields" : "Log In"}
                </button>
                <p className="text-gray-300 text-sm text-center">
                    Don't have an account?{" "}
                    <Link href="/signup" className="text-blue-400 hover:underline">
                        Sign Up
                    </Link>
                </p>
                <p className="text-gray-300 text-sm text-center">
                    Forgot your password?{" "}
                    <Link href="/resetyourpassword" className="text-blue-400 hover:underline">
                        Reset Password
                    </Link>
                </p>

            </div>
        </div>
    )
}