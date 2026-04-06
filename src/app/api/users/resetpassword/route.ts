import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request:NextRequest){
    try{
        await connect();
        const reqBody=await request.json();
        const {token,newpassword}=reqBody;
        if(!token){
            console.log("Token is missing in the request body");
            return NextResponse.json({message:"Token is required"},{status:400});
        }
        const user=await User.findOne({forgotPasswordToken:token,forgotPasswordTokenExpiry:{$gt:Date.now()}});
        if(!user){
            console.log("cant find user with the provided token or token has expired");
            return NextResponse.json({message:"Invalid or expired token"},{status:400});
        }
        user.password=await bcrypt.hash(newpassword,10);
        user.forgotPasswordToken=undefined;
        user.forgotPasswordTokenExpiry=undefined;
        await user.save();
        console.log("Password reset successful for user:", user.email);
        return NextResponse.json({message:"Password reset successful"},{status:200});
    } catch(error:any){
        console.error("Error occurred while resetting password:", error);
        return NextResponse.json({message:error.message||"Something went wrong"},{status:500});
    }
}