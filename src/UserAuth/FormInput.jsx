import { Visibility, VisibilityOff } from "@mui/icons-material"
import { IconButton } from "@mui/material"
import { useState } from "react"

export default function FormInput({form,fieldName,icon,updateInput}){
    const [type,setType] = useState(fieldName==="password" ? "password":"text")
    const changeVisibility = (e)=>{
        setType(type==="password" ? "text" : "password")
    }
    
    const capitalize = (word)=>{
        const firstLetter = word.charAt(0)
        const firstLetterCap = firstLetter.toUpperCase()
        const remainingLetters = word.slice(1)
        return firstLetterCap + remainingLetters
    }

    return(
        <>
            <label htmlFor={fieldName}>
                {capitalize(fieldName)}:
            </label>
            
            <div className="formInputDiv">
                <input 
                type={type}
                value={form[fieldName]} 
                name={fieldName}
                id={fieldName}
                placeholder={`Type your ${fieldName}`}
                required 
                onInput={updateInput}/>

                {icon}
                
                {fieldName==="password" &&
                    <IconButton id="endIconBtn" onClick={changeVisibility}>
                        {type==="password" ?
                            <Visibility id="endIcon"/> : 
                            <VisibilityOff id="endIcon"/>    
                        }
                    </IconButton>
                }
            </div>                      
        </>
    )
}