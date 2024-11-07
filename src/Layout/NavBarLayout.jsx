import SearchBar from "./SearchBar"
import { IconButton } from "@mui/material"
import { DarkMode, FavoriteBorder,LightMode,ShoppingCartOutlined } from "@mui/icons-material"
import { sessionContext } from "../Contexts"
import { useContext, useState } from "react"
import { useNavigate } from "react-router"
import axios from "axios"
import "./navBarLayout.css"
import { Link } from "react-router-dom"

export default function NavBarLayout(){
    const {user,loadData} = useContext(sessionContext)
    const [themeIcon,setThemeIcon] = useState(<LightMode/>)
    const navigate = useNavigate()

    const islogged = ()=>{
        return user ? true:false
      }
      const handleLogAction = ()=>{
        if(user!=undefined && user!=false){
    
          axios.post(`https://sneakers-e-commerce.onrender.com/account/${user._id}/logout`,{},{withCredentials:true}).
          then((res)=>{
            
            loadData()
            navigate("/")
          })
        }
        else{
          navigate("/login")
        }
      }

    const changeTheme = async ()=>{
      const app = document.querySelector("#root")
      const circle = document.querySelector("#circle")
      if(user){
        const res = await axios.patch(`https://sneakers-e-commerce.onrender.com/account/${user._id}/changeTheme`,{},{withCredentials:true})
        circle.classList.toggle("darkMode")
        setThemeIcon(res.data==="light" ? <LightMode/> : <DarkMode/>)
        loadData()
      }
      else{
        circle.classList.toggle("darkMode")
        if(app.getAttribute("data-theme")==="light"){
          app.setAttribute("data-theme","dark")
          setThemeIcon(<DarkMode/>)
          
          
        }
        else{
          app.setAttribute("data-theme","light")
          setThemeIcon(<LightMode/>)
          
        }
      }
    }

    return(
      <nav id="titleNav">
        <h1 id="title"><Link to="/">Sneaker Lounge</Link></h1>
        <SearchBar/>
        <div id="btnsDiv">

          <IconButton onClick={()=>{
            navigate(`/${user ? `${user._id}/favorites` : "login"}`)
          }}>
            <FavoriteBorder id="navHeartIcon"/>
            <span className="numberSpan">
              {user ? user.favoritesList.length : 0}
              </span>
          </IconButton>

          <IconButton onClick={()=>{
            navigate(`/${user ? `${user._id}/cart` : "login"}`)

          }}>
            <ShoppingCartOutlined id="navCartIcon"/>
            <span className="numberSpan">
              {user ? user.cartList.length : 0}
            </span>

          </IconButton>
          
          <div id="themeDiv" onClick={changeTheme}>

            <div id="themeBtnContainer">
            </div>

            <div id="circle">
                {user ? 
                  (user.theme==="light" ?<LightMode/> : <DarkMode/>):
                  themeIcon
                }
            </div>

          </div>
          
          <div id="logBtnDiv">
            {user!==undefined &&
            <button id={`NavBarLog${islogged() ? "out" : "in"}Btn`} onClick={handleLogAction}>
              {`Log ${islogged() ? "Out" : "In"}`}
            </button>
            }
          </div>
        </div>
      </nav>
    )
}