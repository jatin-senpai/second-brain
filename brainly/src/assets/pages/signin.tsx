import { useNavigate } from "react-router-dom";
import { Button } from "../components/button";
import { Input } from "../components/Input";
import { useRef } from "react";
import axios from "axios";
function SignIn(){
    const usernameref = useRef<HTMLInputElement>()
    const passwordref = useRef<HTMLInputElement>()
    const navigate = useNavigate()
    async function signin(){
        
        const username = usernameref.current?.value
        const password = passwordref.current?.value
        console.log(username)
        const response = await axios.post("http://localhost:3000/api/v1/signin",{
            
                username,
                password
            
        })
        //@ts-ignore
        const  jwt = response.data.token
        localStorage.setItem("token",jwt)
        navigate("/dashboard")
        
    }
    return(
    <>
        <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
            <div className="bg-white min-w-48 rounded border p-8">
                <Input reference={usernameref} placeholder="username"/>
                <Input reference={passwordref} placeholder="password"/>
                <div className="felx justify-center pt-4">
                    <Button onClick={signin} varient="primary" text="Signin" />
                </div>
                
            </div>
            
        </div>
         
     </>
       
    )
}
export default SignIn 