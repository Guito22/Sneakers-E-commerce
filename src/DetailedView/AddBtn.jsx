import React, { useState,useContext } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { snackBarContext,sessionContext } from '../Contexts';
import { useNavigate } from 'react-router';
import axios from 'axios';

export default function AddBtn({stock,product}) {
  const [quantity, setQuantity] = useState(1); // Default quantity
  const {setSnackBar} = useContext(snackBarContext)
  const {user,loadData} = useContext(sessionContext)
  const navigate = useNavigate()

  const handleQuantityChange = (e) => {
    if(e.target.value<=stock && (e.target.value>0 || e.target.value=="")){
      
      setQuantity(e.target.value); // Ensure the quantity is at least 1
    }
  }

  const addToCart = async () => {
    if(user){
      if(quantity>0){
        const res = await axios.patch(`http://localhost:3000/account/${user._id}/${product._id}/cart/add`,{quantity},{withCredentials:true})
        if(res.data==="added"){

          loadData()
          setSnackBar({
            text:`Added ${quantity} item${quantity>1 ? "s":""} to the cart`,
            bg:"green",
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
        setSnackBar({
          text:"Specify the number of pairs you want to add to the cart",
          bg:"orange",
          open:true
        })        
      }
    }
    else{
      navigate("/login")
    }

  };


  return (
    <>
      <TextField
        type="number"
        id="quantityInput"
        label="Quantity"
        value={quantity}
        onChange={handleQuantityChange}
        InputProps={{ inputProps: { min: 0 } }}
        variant="outlined"
        size="small"
        
      />
      <Button variant="contained" startIcon={<ShoppingCartIcon/>} size='medium' color="primary" onClick={addToCart}>
        Add to Cart
      </Button>


    </>
  );
}
