import ProductsTable from "./ProductsTable";
import { sessionContext } from "../Contexts";
import { useContext} from "react";

export default function FavoritesList(){
    const {user,sneakers} = useContext(sessionContext)
    
    const favSneakersList = ()=>{
        if(user){
            return sneakers.filter((i)=>{
                return user.favoritesList.includes(i._id)
            })

        }
        else{
            return []
        }
    }
    return(
        <>
            <h1 className="text-center mt-3 fw-bold">
                {favSneakersList().length>0 ?
                "Favorites" : "Add sneakers to the list"}
            </h1>
            <ProductsTable 
            tableType="favorites"
            sneakers={favSneakersList()}
            />

        </>
    )
}