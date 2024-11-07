import Footer from "./Footer"
import { useEffect, useLayoutEffect, useState } from "react"
import {sessionContext} from "../Contexts"
import axios from "axios"
import BodyLayout from "./BodyLayout"
import NavBarLayout from "./NavBarLayout"
import "./layout.css"
import { useLocation } from "react-router"

//layout present in all routes
export default function Layout() {

  const [user,setUser] = useState(undefined)
  const [sneakers,setSneakers] = useState(false)
  const [load,setLoad] = useState(false)
  const location = useLocation()

  const loadData = ()=>{
    setLoad(!load)
  }

  const getUser = async ()=>{
    const userFound = await axios.get("https://sneakers-e-commerce.onrender.com/account/user",{withCredentials:true})
    const sneakerList = await axios.get("https://sneakers-e-commerce.onrender.com/sneakers",{withCredentials:true})
    const root = document.querySelector("#root")
    const circle = document.querySelector("#circle")
    if(userFound.data){
      root.setAttribute("data-theme",userFound.data.theme)

    }
    if(userFound.data.theme==="dark"){
      circle.classList.add("darkMode")
    }
    setUser(userFound.data)
    setSneakers(sneakerList.data)
  }
  //everytime loadData is called user and sneakers will be requested
  useEffect(()=>{
    getUser()
  },[load])

  //to reset scroll everythime route changes
  useLayoutEffect(()=>{
    document.documentElement.scrollTo({top:0,left:0,behavior:"instant"})
  },[location.pathname])

  return (

    <sessionContext.Provider value={{user,loadData,sneakers}}>

      <NavBarLayout/>

      <BodyLayout/>

      <Footer/>

    </sessionContext.Provider>
    
  )
}

