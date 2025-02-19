import { Button } from "../components/button";
import { Input } from "../components/Input";
import { useRef } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";

export function SignUp(){
    const navigate = useNavigate()
    const usernameref = useRef<HTMLInputElement>()
    const passwordref = useRef<HTMLInputElement>()
    async function signup(){
        const username = usernameref.current?.value
        const password = passwordref.current?.value
        console.log(username)
        const response = await axios.post("http://localhost:3000/api/v1/signup",{
            
                username,
                password
            
        })
        alert("you have signed up")
        console.log(response)
        navigate("/signin")
    }
    return(
    <>
        <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
            <div className="bg-white min-w-48 rounded border p-8">
                <Input reference={usernameref}placeholder="username"/>
                <Input reference ={passwordref} placeholder="password"/>
                <div className="felx justify-center pt-4">
                    <Button onClick={signup} varient="primary" text="Signup" />
                </div>
                
            </div>
            
        </div>
         
     </>
       
    )
}