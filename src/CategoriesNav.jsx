import { useNavigate } from "react-router"
import "./categoriesNav.css"
import { Link } from "react-router-dom"

export default function CategoriesNav({selected}) {
    const navigate = useNavigate()
    const categories = ["sneakers","men","women","kids","running","casual","football"]

    return(
        <nav id='categoriesNav'>
            {categories.map((category) => {
                return <Link 
                        key={category} 
                        id={`${selected==category && "selected"}`} 
                        to={`/${category}`}>
                        {category.toUpperCase()}
                       </Link>
            })}
        </nav>
    )
}