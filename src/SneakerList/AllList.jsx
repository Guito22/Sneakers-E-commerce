import SneakersList from "./SneakersList";
import CategoriesNav from "../CategoriesNav";

export default function AllList() {
    const getAllSneakers = (i)=>{
        return true
    }

    return (
        <>
            <CategoriesNav selected="sneakers"/>
            <SneakersList 
            filterFunc={getAllSneakers}/>
        </>
    )
}