"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function RESETPASS() {
    const [token, setToken] = useState("");
    const [newpassword, setNewPassword] = useState("");
    const [verified, setverified] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const resetpassword = async () => {
        try {
            setLoading(true);
            const res = await axios.post("/api/users/resetpassword", {
                token,
                newpassword
            });
            setverified(true);
        } catch (error: any) {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const urlToken = window.location.search.split("token=")[1];
        setToken(urlToken || "");
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 gap-4">

            {!verified && !error && (
                <>
                    <h1 className="text-xl font-bold">Enter New Password</h1>

                    <input
                        type="password"
                        placeholder="New Password"
                        className="border p-2 rounded"
                        value={newpassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />

                    <button
                        onClick={resetpassword}
                        disabled={loading || newpassword.length === 0}
                        className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
                    >
                        {loading ? "Resetting..." : "Reset Password"}
                    </button>
                </>
            )}

            {verified && (
                <div className="bg-green-100 text-green-800 p-4 rounded">
                    Password reset successful! You can now{" "}
                    <Link href="/login" className="text-blue-500 underline">
                        login
                    </Link>.
                </div>
            )}

            {error && (
                <div className="bg-red-100 text-red-800 p-4 rounded">
                    Invalid or expired token. Please try again.
                </div>
            )}
        </div>
    );
}