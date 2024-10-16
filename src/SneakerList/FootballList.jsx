import SneakersList from "./SneakersList";
import CategoriesNav from "../CategoriesNav";

export default function FootballList() {
    const getFootballSneakers = (i)=>{
        return i.category==="FOOTBALL"
    }

    return (
        <>
            <CategoriesNav selected="football"/>
            <SneakersList 
            filterFunc={getFootballSneakers}/>
        </>
    )
}