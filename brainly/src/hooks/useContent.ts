import { useEffect, useState } from "react";
import { Backend_Url } from "../config";
import axios from "axios";
export function useContent(){
    const [contents,setContents] = useState([])
    function refresh(){
        axios.get(Backend_Url+"/api/v1/content",{
            headers:{
                "Authorization":localStorage.getItem("token")
            }
        }).then((response)=>{
            
            setContents(response.data.content)
        })
        
    }
    useEffect(()=>{
        let interval=refresh()
        setInterval(()=>{refresh},10*1000)
        return ()=>{
            clearInterval(interval)
        }
    },[])
    return {contents,refresh}
}
        