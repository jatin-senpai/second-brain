import express from "express"
import {User,Content,Link} from "./db"
import { usermiddleware } from "./middleware"
import { jwtkey } from "./config"
import jwt from "jsonwebtoken"
const app = express()
app.use(express.json())
app.post("/api/v1/signup",async (req,res)=>{
    const username= req.body.username
    const password = req.body.password
    try{
        await User.create({
            username:username,
            password:password
        })
        res.json({
            message: "You have signed up"
        })
    }
    catch(e){
        res.status(403).json({
            message:"User already exists"
        })
    }
    


})
app.post("/api/v1/signin",async (req,res)=>{
    const username= req.body.username
    const password = req.body.password
    const user = await User.findOne({username,password})
    if(user){
        const token = jwt.sign({id:user._id},jwtkey)
        res.json({
            token
        })
    }
    else{
        res.status(403).json({message: "Incorrect credentials"})
    }
    
    
    
})

app.post("/api/v1/content",usermiddleware,async (req,res)=>{
    const {link,type,title} = req.body
    await Content.create({
        link,
        type,
        title,
        //@ts-ignore
        UserId:req.userId,
        tags:[]

    })
    res.json({
        message:"Content added"
    })
})
app.get("/api/v1/content",usermiddleware,async (req,res)=>{
    //@ts-ignore
    const us = req.userId
    const mat=await Content.find({UserId:us}).populate("UserId","username")
    res.status(200).json(mat)

})

app.delete("/api/v1/content",usermiddleware,async (req,res)=>{
    //@ts-ignore
    const delete_id = req.userId
    const del = await Content.deleteMany({Content,UserId:delete_id})
    res.status(200).json({
        message:"Deleted"
    })
})
app.post("api/v1/brain/share",usermiddleware,(req,res)=>{

})
app.listen(3000,()=>{
    console.log("Server running on port 3000")
})