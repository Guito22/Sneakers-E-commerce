import React, { useContext } from 'react';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import { Favorite } from '@mui/icons-material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router';
import { snackBarContext } from '../Contexts';
import { sessionContext } from '../Contexts';
import axios from 'axios';


export default function ProductCard({ product }) {
  const {user,loadData} = useContext(sessionContext)
  const {setSnackBar} = useContext(snackBarContext)

  const hasDiscount = product.originalPrice;
  const discountPercentage = hasDiscount ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;
  const navigate = useNavigate()
  const seeDetails = ()=>{
    navigate(`/sneaker/${product._id}`)
  }

  const addToCart = async ()=> {
    if(user){
      const res = await axios.patch(`https://sneakers-e-commerce.onrender.com/account/${user._id}/${product._id}/cart/add`,{quantity:1},{withCredentials:true})
        if(res.data==="added"){

          loadData()
          setSnackBar({
            text:"Added to the cart",
            bg: "lightcoral",
            open:true
          })
        }
        else{
          setSnackBar({
            text:"There is not enough stock to add it to the cart",
            bg: "red",
            open:true
          })          
        }
      }  
    else{
      navigate("/login")
    }
      
  };
  
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

  return (
    <div className="product-card">

      {hasDiscount && <div className="discount-label">-{discountPercentage}%</div>}
      <img src={product.imageURL} alt={product.name} className="product-image" onClick={seeDetails}/>
      
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        
        <div className="product-actions">
          <IconButton id='favBtn' aria-label="add to favorites" onClick={addToFav}>
            {user && user.favoritesList.includes(product._id) ?
              <Favorite/> : <FavoriteBorder/>}
          </IconButton>
          <Button id='addToCartBtn' variant="contained" startIcon={<ShoppingCartIcon />} size="medium" onClick={addToCart}>
            Add to Cart
          </Button>
        </div>

        <div className="product-pricing">
          {hasDiscount ? (
            <>
              <span className="price original-price">
                ${product.originalPrice}
              </span>
              <span className="price discounted-price">
                ${product.price}
              </span>
            </>
            ) : (
              <span className="price">
                ${product.price}
              </span>
          )}
        </div>
      </div>
    </div>
  );
}