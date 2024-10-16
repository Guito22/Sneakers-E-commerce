import SneakersList from "./SneakersList";
import CategoriesNav from "../CategoriesNav";

export default function WomenList() {
    const getWomenSneakers = (i)=>{
        return i.gender==="WOMEN"
    }

    return (
        <>
            <CategoriesNav selected="women"/>
            <SneakersList 
            filterFunc={getWomenSneakers}/>
        </>
    )
}