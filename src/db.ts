import mongoose from "mongoose";
import { Schema,ObjectId } from "mongoose";
mongoose.connect("mongodb+srv://Shake:KOnp1ooKOT70MZYO@cluster0.b2igc.mongodb.net/Brainly")
const Usermodel = new Schema({
    username : { type:String , unique:true},
    password : {type: String}
})
export const User = mongoose.model("user",Usermodel)


const Contentmodel = new Schema({
    title:String,
    tpye:String,
    link:String,
    tags:[{type:mongoose.Types.ObjectId, ref:"tags" }],
    UserId: [{
        type: mongoose.Types.ObjectId,
        ref: "user",
        required: true
    }]
})
export const Content= mongoose.model("content",Contentmodel) 
const Linkmodel = new Schema({
    hash:String,
    UserId: {
        type: mongoose.Types.ObjectId,
        ref: "user",
        required: true,
        unique:true
    }
    
})
export const Link = mongoose.model("link",Linkmodel)

