import { useState } from "react"
import ActionSnackbar from "../ActionSnackBar"
import { Outlet } from "react-router"
import { snackBarContext } from "../Contexts"

//this will render the element of the route
export default function BodyLayout(){
    const [snackBar,setSnackBar] = useState({
        text:"",
        bg:"",
        open:false
      })
    return(
      <main id="bodyLayoutDiv">

        <snackBarContext.Provider value={{snackBar,setSnackBar}}>

          <Outlet/>
          <ActionSnackbar/>

        </snackBarContext.Provider>
      </main>
    )
}