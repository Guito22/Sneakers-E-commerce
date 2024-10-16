import ProductsTable from "./ProductsTable";
import { sessionContext } from "../Contexts";
import { useContext } from "react";
import PaymentSection from "./PaymentSection";
import {Alert} from "@mui/material"

export default function CartList(){
    const {user,sneakers} = useContext(sessionContext)

    const getCartList = ()=>{
        if(user){
            const cartIds = user.cartList.map((i)=>{
                return i.sneaker
            })
            return sneakers.filter((i)=>{
                return cartIds.includes(i._id)
            })

        }
        else{
            return []
        }
    }

    const isEveryItemAvaliable = ()=>{
        if(user){
            return user.cartList.every((i)=>{
                const sneaker = sneakers.find((j)=>{
                    return j._id==i.sneaker
                })
                return sneaker.items_left>=i.quantity
            })
        }
        return "no accesible"
    }

    return(
        <>
            <h1 className="text-center mt-3 fw-bold">
                {getCartList().length>0 ?
                "Cart" : "Add sneakers to the list"}
            </h1>

            {!isEveryItemAvaliable() &&
                <Alert severity="error" sx={{width:"60vw",margin:"0 auto",display:"flex",justifyContent:"center"}}>
                    The sneaker cells displayed in red have not enought stock,everything in the list has to be availiable
                </Alert>
            }

            <ProductsTable tableType="cart" sneakers={getCartList()}/>

            {(getCartList().length>0 && isEveryItemAvaliable()) &&
                <PaymentSection/>
            }
        </>
    )
}