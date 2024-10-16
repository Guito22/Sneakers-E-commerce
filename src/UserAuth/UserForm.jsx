import "./userAuth.css"
import {PersonOutlined,LockOutlined, MailOutline} from "@mui/icons-material";
import Alert from '@mui/material/Alert';
import FormInput from "./FormInput";
import { Link } from "react-router-dom";

export default function UserForm({title,image,form,alert,updateInput,handleSubmit}) {

    return (
        <div id="authDiv">
            <img src={image} alt="formImg" />
        
            <div id="formDiv" className={title==="LOG IN" ? "Login":"Signup"}>
                <form action="" onSubmit={handleSubmit}>
                    <h1>{title}</h1>
                   
                    <div id="inputAlert">
                        {alert.message &&
                            <Alert id="alert" severity={alert.severity}>
                                {alert.message}
                            </Alert>
                        }
                    </div>

                    {title==="SIGN UP" &&
                        <FormInput 
                        form={form} 
                        fieldName="name" 
                        icon={<PersonOutlined className="startIcon"/>} 
                        updateInput={updateInput}/>
                    }

                    <FormInput 
                    form={form} 
                    fieldName="email" 
                    icon={<MailOutline className="startIcon"/>} 
                    updateInput={updateInput}/>
                    
                    <FormInput form={form} 
                    fieldName="password" 
                    icon={<LockOutlined className="startIcon"/>} 
                    updateInput={updateInput}/>

                    <button type="submit" id="submitBtn" className={`btn btn-${title=="LOG IN" ? "primary" : "success"}`}>
                        {title}
                    </button>

                    {title=="LOG IN" ? 
                        <p>Don't have an account? <Link to="/signup">Sign up</Link></p> :
                        <p>Already have an account? <Link to="/login">Log in</Link></p> 
                    } 

                </form>
            </div>

        </div>
    );
    }