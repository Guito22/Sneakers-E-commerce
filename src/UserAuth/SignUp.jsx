import UserForm from "./UserForm";
import image from "../assets/signupImg.webp";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function signUp() {
    const [form,setForm] = useState({name:"",email:"",password:""})
    const [alert,setAlert] = useState({message:"",severity:""})
    
    const nameRegex = /^[a-zA-Zá-ú]$/

    const navigate = useNavigate()
    const updateInput = (e)=>{
        
        setAlert({message:"",severity:""})
        const {name,value} = e.target

        //to prevent white spaces
        if(value.includes(" ")){
            return
        }
        if(name=="name"){
            for (const letter of value) {
                if(!nameRegex.test(letter)){
                    return
                } 
            }
        }

        if((name=="name" && value.length<40) || name!="name"){
            setForm({...form,[name]:value})

        }
    }
    
    const handleSubmit = async (e)=>{
        
        e.preventDefault()
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        const isEmailValid = emailRegex.test(form.email)
        const theme = document.querySelector("#root").getAttribute("data-theme")
        if(form.name.length<2){
            setAlert({
                message: "Name must be at least 2 characters long",
                severity:"warning"
            })
            return           
        }
        if(!isEmailValid){
            setAlert({
                message: "The email format is not valid",
                severity:"warning"
            })
            return
        }
        if(form.password.length<8){
            setAlert({
                message: "Password must be at least 8 characters long",
                severity:"warning"
            })
            return           
        }
        if(form.name && form.email && form.password && isEmailValid){
            axios.post("https://sneakers-e-commerce.onrender.com/account/signup",{...form,theme},{withCredentials:true}).
            then((res)=>{
                if(!res.data){
                    setAlert({
                        message:"The email is already registered",
                        severity:"error"
                    })
                }
                else{

                    setForm({name:"",email:"",password:""})                
                    navigate("/login")
                }
            })
        }

    }

    return(
            <UserForm 
            title="SIGN UP" 
            image={image} 
            form={form} 
            alert={alert}
            updateInput={updateInput}
            handleSubmit={handleSubmit}/>
    )
}