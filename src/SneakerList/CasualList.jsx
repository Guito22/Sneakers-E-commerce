import SneakersList from "./SneakersList";
import CategoriesNav from "../CategoriesNav";

export default function CasualList() {
    const getCasualSneakers = (i)=>{
        return i.category==="CASUAL"
    }

    return (
        <>
            <CategoriesNav selected="casual"/>
            <SneakersList 
            filterFunc={getCasualSneakers}/>
        </>
    )
}