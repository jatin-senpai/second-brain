//controlled component
import {useState} from "react"
import { Input } from "./Input"
import { Button } from "./button"
import { cross } from "./icons/cross"
import { useRef } from "react"
import { Backend_Url } from "../../config"
import axios from "axios"
enum Contenttype{
    Youtube = "youtube",
    Twitter = "twitter"
}
export function CreateContentModal({open,onClose}){
    const [type,settypeinput] = useState(Contenttype.Youtube)
    
    const titleref = useRef<any>()
    const linkref = useRef<any>()
    async function content(){
        
        const title = titleref.current?.value
        const link = linkref.current?.value
        await axios.post(Backend_Url+"/api/v1/content",{
            type,
            title,
            link
        },{
            headers:{
            "Authorization":localStorage.getItem("token")
        }})
        onClose()
    }

    return <div>
        {open && <div className="w-screen h-screen bg-slate-500 opacity-20 flex fixed justify-center">
            <div className="flex flex-col  justify-center items-center mx-auto">
                <span className="bg-white ">
                    <div className="flex justify-end cursor-pointer" onClick={onClose}>{cross}</div>
                    <div>
                        <Input reference={titleref} placeholder={"Title"}/>
                        <Input reference={linkref} placeholder={"Link"} />
                        
                        
                    </div>
                    <div className="">
                        <h1 className="flex justify-center m-2 font-black">Type</h1>
                        <div className="flex gap-4 justify-center mb-8">
                        <Button text="Youtube" varient={type===Contenttype.Youtube?"primary":"secondary"} onClick={()=>{
                            settypeinput(Contenttype.Youtube)
                        }}/>
                        <Button text="Twitter" varient={type===Contenttype.Twitter?"primary":"secondary"} onClick={()=>{
                            settypeinput(Contenttype.Twitter)
                        }}/>
                        </div>
                        
                    </div>
                    <div className="flex justify-center">
                        <Button onClick={content} varient="primary" text="Submit"/>
                    </div>
                    
                </span>
            </div>
            
        </div>}
    </div>
}
