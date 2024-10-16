import ProductCard from "./ProductCard"
import "./sneakersList.css"
import { sessionContext } from "../Contexts";
import { useContext } from "react";

export default function SneakersList({filterFunc}) {
    const {sneakers} = useContext(sessionContext)
    const sneakerList = ()=>{
        if(sneakers){
            return sneakers.filter(filterFunc)
        }
        else{
            return []
        }
    }
    return (
        <>
            {sneakerList().length!==0 && 
                 
            <div id="sneakersListDiv">
                {sneakerList().map((product) => {
                    return <ProductCard 
                            product={product}
                            key={product._id}/>
                })}
            </div>
            }
        </>
    )
}