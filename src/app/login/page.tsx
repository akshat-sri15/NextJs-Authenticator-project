"use client";
import Link from "next/link";
import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
export default function LoginPage(){
    const [User, setUser] = React.useState({
        email: "",
        password: "",
    });

    const onLogin = async () => {

    }

    return(
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            x
            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-[350px] flex flex-col gap-4 border border-white/20">
                
                <h1 className="text-3xl font-bold text-white text-center">
                    Log In
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
                    Log In
                </button>
                <p className="text-gray-300 text-sm text-center">
                    Don't have an account?{" "}
                    <Link href="/signup" className="text-blue-400 hover:underline">
                        Sign Up
                    </Link>
                </p>

            </div>
        </div>
    )
}