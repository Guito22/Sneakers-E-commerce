import UserForm from "./UserForm";
import image from "../assets/loginImg.avif";
import { useState,useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { sessionContext } from "../Contexts";

export default function Login() {
    const navigate = useNavigate()
    const [form,setForm] = useState({email:"",password:""})
    const [alert,setAlert] = useState({message:"",severity:""})
    const {loadData} = useContext(sessionContext)

    const updateInput = (e)=>{
        setAlert({message:"",severity:""})
        const {name,value} = e.target

        //to prevent white spaces
        if(value.includes(" ")){
            return
        }

        setForm({...form,[name]:value})
    }
    const handleSubmit= async (e)=>{
        e.preventDefault()

        if(form.email && form.password){
            const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
            const isEmailValid = emailRegex.test(form.email)
            if(!isEmailValid){
                setAlert({
                    message: "The email format is not valid",
                    severity:"warning"
                })
            }
            else{
                axios.post("http://localhost:3000/account/login",form,{withCredentials:true}).
                then((res)=>{
                    if(res.data==="Error"){
                        setAlert({
                            message:"Email or Password is invalid",
                            severity:"error"
                        })
                    }
                    else{
                        loadData()
                        setForm({name:"",email:"",password:""})                
                        navigate("/")
                    }
                })
            }
        }
    }
    
    return(
            <UserForm 
            title="LOG IN" 
            image={image} 
            form={form} 
            alert={alert}
            updateInput={updateInput}
            handleSubmit={handleSubmit}/>
    )

}
