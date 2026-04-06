import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel.js";
import { NextRequest,NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request:NextRequest){
    await connect();
    try{
        const reqBody = await request.json();
        const {email, password} = reqBody;
        console.log("Request Body:", reqBody);
        console.log(reqBody);
        if(!email || !password){
            return NextResponse.json({message: "All fields are required"}, {status: 400});
        }
        const user = await User.findOne({email});
        console.log("User found:", user);
        if(!user){
            return NextResponse.json({message: "User does not exist"}, {status: 400});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        console.log("Password match:", isMatch);
        if(!isMatch){
            return NextResponse.json({message: "Invalid credentials"}, {status: 400});
        }
        const tokenData={
            id: user._id,
            email: user.email,
            username: user.username,
        }
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"});
        const response = NextResponse.json({message: "Login successful"}, {status: 200});
        response.cookies.set("token", token, {
            httpOnly: true,
        });
        
        return response;
        
    } catch(error:any){
        console.log(error);
        return NextResponse.json({message: "Something went wrong"}, {status: 500});
    }
}