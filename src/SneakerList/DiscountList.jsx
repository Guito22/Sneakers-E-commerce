import SneakersList from "./SneakersList";
export default function DiscountList() {
    const getDiscountedSneakers = (i,index)=>{
        return i.originalPrice
    }

    return (
        <>
            <SneakersList 
            filterFunc={getDiscountedSneakers}/>
        </>
    )
}