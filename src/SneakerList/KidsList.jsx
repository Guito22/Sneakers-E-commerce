import SneakersList from "./SneakersList";
import CategoriesNav from "../CategoriesNav";

export default function KidsList() {
    const getKidsSneakers = (i)=>{
        return i.gender==="KIDS"
    }

    return (
        <>
            <CategoriesNav selected="kids"/>
            <SneakersList 
            filterFunc={getKidsSneakers}/>
        </>
    )
}