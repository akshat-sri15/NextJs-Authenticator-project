"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
export default function VerifyEmail() {
    const [token, setToken] = useState("");
    const [verified, setverified] = useState(false);
    const [error, setError] = useState(false);
    const verifyEmail = async () => {
        try {
            const res = await axios.post("/api/users/verifyemail", { token });
            setverified(true);
        } catch (error: any) {
            setError(true);
        }
    }
    useEffect(() => {
        const urlToken=window.location.search.split("token=")[1];
        setToken(urlToken||"");
    },[])
    useEffect(() => {
            if(token.length>0){
                verifyEmail();
            }
        },[token]);

    return(
       <div className="flex flex-col items-center justify-center min-h-screen py-2">
          {verified&&(
            <div className="bg-green-100 text-green-800 p-4 rounded">
                Email verified successfully! You can now <Link href="/login" className="text-blue-500 underline">login</Link>.
            </div>
          )}
          {error&&(
            <div className="bg-red-100 text-red-800 p-4 rounded">
                Invalid or expired token. Please try again.
            </div>
          )}
       </div>
    )
}
