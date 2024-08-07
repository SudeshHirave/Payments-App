import { useState } from "react"
import { BottomLabel } from "../components/BottomLabel"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading} from "../components/SubHeading"
import { Navigate, useNavigate } from "react-router-dom"
import axios from "axios";
function Signin(){
    const navigate = useNavigate();
const[userName,setuserName]= useState("");
const[password,setPassword]= useState("");
    return ( 
    <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="flex flex-col justify-center w-1/4">
            <div className="flex-col justify-center text-center shadow-md shadow-cyan-500/50 bg-white rounded-lg h-100 p-2">
            <Heading label={"Signin"}/>
            <SubHeading label={"Enter your email and password"}/>
            <InputBox onChange={e=>{
                    setuserName(e.target.value);
                }}  Placeholder="Jondoeexample@.com" label={"Email"}></InputBox>
            <InputBox onChange={e=>{
                    setPassword(e.target.value);
                }} Placeholder="Password" label={"Password"}></InputBox>
            <Button onPress={async()=>{
                try{
                    const response = await axios.post("http://localhost:3000/api/v1/user/signin",{
                        userName,
                        password
                    })
                    const token = response.data.Token;
                    if(token){
                        localStorage.setItem("token",token);
                        console.log(response.data.token);
                        navigate("/dashboard");
                    }
                }catch(eroor){
                    console.error('Error during sign-in:', error);
                    alert('Failed to sign in. Please check your credentials and try again.');
                }
                

            }} label={"Submit"}></Button>
             <BottomLabel label={"Dont have account"} link={"Signup"} to={"/signup"}></BottomLabel>
        </div>
        </div>
    </div>
    )
}

export default Signin