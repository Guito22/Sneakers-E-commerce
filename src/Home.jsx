import banner from './assets/banner.jpg';
import CategoriesNav from './CategoriesNav';
import DiscountList from './SneakerList/DiscountList';
export default function Home() {
    return(
        <>
            <CategoriesNav selected=""/>

            <img src={banner} alt="" id='banner' className='w-100'/>

            <h1 className='text-center p-3 fw-bold'>On Discount</h1>

            <DiscountList/>
        </>
    )
}