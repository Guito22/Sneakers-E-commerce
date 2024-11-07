import { useContext } from "react";
import { useParams } from "react-router"
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';

import "./detailedView.css"
import { IconButton } from "@mui/material";
import AddBtn from "./AddBtn";
import { snackBarContext } from "../Contexts";
import { sessionContext } from "../Contexts";
import { useNavigate } from "react-router";
import axios from "axios";
import { Favorite } from "@mui/icons-material";

export default function DetailedView(){
  const {user,sneakers,loadData} = useContext(sessionContext)
  const {productId} = useParams()
  const navigate = useNavigate()
  const {setSnackBar} = useContext(snackBarContext)
  const getProduct = ()=>{
      if(sneakers){
        for (const sneaker of sneakers) {
          if(productId===sneaker._id){
            return sneaker
          }
          
        }
      }
      return []
    }
    const product = getProduct()
    const hasDiscount = product.originalPrice;
    const discountPercentage = hasDiscount ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

    const addToFav = async ()=>{
      if(user){
        const res = await axios.post(`https://sneakers-e-commerce.onrender.com/account/${user._id}/${product._id}/favorite`,{},{withCredentials:true})
          loadData()
          setSnackBar({
            text:` ${res.data} ${res.data==="Added" ? "to" : "from"} favorites`,
            bg: "lightcoral",
            open:true
          })
      }
      else{
        navigate("/login")
      }
    }
    return(
      <div className="product-detailed d-flex align-items-center position-relative">
        {hasDiscount && <div className="detailed-discount-label">-{discountPercentage}%</div>}

        <div className="product-detailed-image">
            <img src={product.imageURL} alt="Product Name"/>
        </div>

        <div className="product-detailed-info">
          <h1 className="product-detailed-title">{product.name}</h1>
          <h4>Brand: {product.brand}</h4>
          <h4>Stock: {product.items_left}</h4>
          <div className="d-flex align-items-center mb-5">
            {hasDiscount ? (
              <>
                <span className="price original-price">${product.originalPrice}</span>
                <span className="price discounted-price">${product.price}</span>
              </>
              ) : (
                <span className="price">${product.price}</span>
            )}

            <IconButton id="favBtn" onClick={addToFav}>
            {user && user.favoritesList.includes(product._id) ?
              <Favorite fontSize="large" sx={{marginLeft:"1rem"}}/> : 
              <FavoriteBorder fontSize="large" sx={{marginLeft:"1rem"}}/> 
            }

            </IconButton>

          </div>

          <div className="product-detailed-actions">

            <AddBtn stock={product.items_left} product={product}/>
          </div>

        </div>
        
      </div>
    )
}