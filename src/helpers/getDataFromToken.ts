import jwt from "jsonwebtoken";
import { NextRequest} from "next/server";
export const getDataFromToken=(request:NextRequest)=>{
    try{
        const token=request.cookies.get('token')?.value||'';
        const decoded:any=jwt.verify(token,process.env.TOKEN_SECRET!);
        console.log("Decoded token data in helper:",decoded);
        return decoded.id;
    }
    catch(error){
        console.log("Error decoding token:",error);
        throw new Error("Invalid token");
    }
}