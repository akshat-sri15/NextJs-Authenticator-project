import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/helpers/mailer";

export async function POST(request:NextRequest){
    try{
        await connect();
        const reqBody=await request.json();
        const {email}=reqBody;
        if(!email){
            return NextResponse.json({message:"Email is required"},{status:400});
        }
        const user=await User.findOne({email});
        if(!user){
            return NextResponse.json({message:"User not found"},{status:404});
        }
        await sendEmail({email, emailType:'RESET', userId:user._id});
        console.log("Password reset email sent to:", email);
        return NextResponse.json({message:"Password reset email sent please check your email"},{status:200});
    } catch(error:any){
        return NextResponse.json({message:error.message||"Something went wrong"},{status:500});
    }
}