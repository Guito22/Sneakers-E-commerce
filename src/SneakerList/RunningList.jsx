import SneakersList from "./SneakersList";
import CategoriesNav from "../CategoriesNav";

export default function RunningList() {
    const getRunningSneakers = (i)=>{
        return i.category==="RUNNING"
    }

    return (
        <>
            <CategoriesNav selected="running"/>
            <SneakersList 
            filterFunc={getRunningSneakers}/>
        </>
    )
}