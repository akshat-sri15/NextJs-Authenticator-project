import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
export async function POST(request:NextRequest){
    try{
        await connect();
        const reqBody=await request.json();
        const {token}=reqBody;
        console.log("Received token in API route:", token);
        const user=await User.findOne({verifyToken:token,verifyTokenExpiry:{$gt:Date.now()}});
        console.log("User found for verification:", user);
        if(!user){
            return NextResponse.json({message:"Invalid or expired token"},{status:400});
        }
        user.isVerified=true;
        user.verifyToken=undefined;
        user.verifyTokenExpiry=undefined;
        await user.save();
        return NextResponse.json({message:"Email verified successfully"},{status:200});
    } catch(error:any){
        return NextResponse.json({message:error.message||"Something went wrong"},{status:500});
    }
}