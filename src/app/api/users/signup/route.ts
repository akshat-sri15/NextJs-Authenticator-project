import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel.js";
import { NextRequest,NextResponse } from "next/server";
import bcrypt from "bcryptjs";


export async function POST(request:NextRequest){
    await connect();
   try{
    const reqBody = await request.json();
    const {email, password, username} = reqBody;
    console.log(reqBody);
    if(!email || !password || !username){
        return NextResponse.json({message: "All fields are required"}, {status: 400});
    }
    const user = await User.findOne({email});
    if(user){
        return NextResponse.json({message: "User already exists"}, {status: 400});
    }
    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(password, salt);
    const newUser = new User({
        email,
        password: hashedPassword,
        username,
    });
    await newUser.save();
    return NextResponse.json({message: "User created successfully"}, {status: 201});
   } catch(error:any){
    console.log(error);
    return NextResponse.json({message: "Something went wrong"}, {status: 500});
   }
}