import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import {connect} from "@/dbConfig/dbConfig"

export async function GET(request:NextRequest){
    try{
        await connect();
        const userId=getDataFromToken(request);
        const user=await User.findById(userId).select("-password");
        //console.log("User data retrieved:",user);
        if(!user){
            return NextResponse.json({message:"User not found"},{status:404});
        }
        return NextResponse.json({
            message:"User data fetched successfully",
            data:user
        }
        );
    }
    catch(error:any){
        console.log(error);
        return NextResponse.json({message:error.message||"Something went wrong"},{status:500});
    }
}