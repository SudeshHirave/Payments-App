import { useState } from "react"
import { BottomLabel } from "../components/BottomLabel"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading} from "../components/SubHeading"
import axios from "axios";
import { Navigate } from "react-router-dom"

function Signup(){
const [firstName,setfirstName]= useState("");
const [lastName,setlastName]= useState("");
const [userName,setuserName]= useState("");
const [Password,setPassword]= useState("");
const navigate = Navigate();
    return  ( 
        <><div>
    
        <div className="flex items-center justify-center h-screen bg-gray-900">
            <div className="flex flex-col justify-center w-1/4">
                <div className="flex-col justify-center text-center shadow-md shadow-cyan-500/50 bg-white rounded-lg h-100 p-2">
                <Heading label={"Signup"}/>
                <SubHeading label={"Enter your email below to create your account"}/>
                <InputBox onChange={e=>{
                    setfirstName(e.target.value);
                }} Placeholder="Jon" label={"First Name"}></InputBox>
                <InputBox onChange={e=>{
                    setlastName(e.target.value);
                }} Placeholder="Doe" label={"Last Name"}></InputBox>
                <InputBox onChange={e=>{
                    setuserName(e.target.value);
                }} Placeholder="Jondoeexample@.com" label={"Email"}></InputBox>
                <InputBox onChange={e=>{
                    setPassword(e.target.value);
                }} Placeholder="Password" label={"Password"}></InputBox>
                <Button onPress={async()=>{
                    try{

                        const response =await axios.post("http://localhost:3000/api/v1/user/signup",{
                            userName,
                            firstName,
                            lastName,
                            password:Password
                        });
                        if(response.data.token){
                            localStorage.setItem("token",response.data.token);
                            navigate('/signin')
                        }
                    }catch(error){
                        console.error("Failde to create account")
                        alert('something went wrong')
                    }
                }} label={"Submit"}></Button>
                <BottomLabel label={"Already have account then"} link={"Signin"} to={"/signin"}></BottomLabel>
            </div>
            </div>
        </div>
        </div>
        </>
        )
}

export default Signup