import { useParams } from "react-router"
import { similarity } from "./wordComparer"
import SneakersList from "./SneakersList";
import CategoriesNav from "../CategoriesNav";


export default function SearchedList(){
    const {term} = useParams()
    const MinSimilarity = 0.5
    const getSearchedSneakers = (i)=>{
        const words = i.name.split(" ")
        for (const word of words) {
            if(similarity(word,term)>=MinSimilarity){
                return true
            }
        }
        if(similarity(i.brand,term)>=MinSimilarity){
            return true
        }
    }

    return(
        <>
            <CategoriesNav selected=""/>
            <h1 className="m-3">Results for "{term}"</h1>
            <SneakersList 
            selected=""
            filterFunc={getSearchedSneakers}/>
        </>
    )
}