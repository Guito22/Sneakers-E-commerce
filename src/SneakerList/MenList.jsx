import SneakersList from "./SneakersList";
import CategoriesNav from "../CategoriesNav";

export default function MenList() {
    const getMenSneakers = (i)=>{
        return i.gender==="MEN"
    }

    return (
        <>
            <CategoriesNav selected="men"/>
            <SneakersList 
            filterFunc={getMenSneakers}/>
        </>
    )
}