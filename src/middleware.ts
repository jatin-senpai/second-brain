import express,{Request,Response,NextFunction} from "express"
import jwt from "jsonwebtoken"
import {jwtkey} from "./config"
const app = express()
export const usermiddleware = async(req:Request,res:Response,next:NextFunction)=>{
    const token = req.headers["authorization"]
    const match = jwt.verify(token as string,jwtkey)
    if(match){
        //@ts-ignore
        req.userId = match.id
        next()
    }
    else{
        res.status(401).json({
            message: "Unauthorised User"
        })
    }

}