import { useContext } from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import { Close } from "@mui/icons-material"
import { IconButton } from "@mui/material"
import { snackBarContext,sessionContext } from "../Contexts"
import "./productsTable.css"
import axios from "axios"
import { Link } from "react-router-dom"

export default function ProductsTable({tableType,sneakers}){
    const {setSnackBar} = useContext(snackBarContext)
    const {loadData,user} = useContext(sessionContext)

    const handleDelete =async (sneaker)=>{
        if(user){
            if(tableType=="cart"){
                const res = await axios.delete(`http://localhost:3000/account/${user._id}/${sneaker._id}/cart/delete`,{withCredentials:true})
            }
            else{
                const res = await axios.post(`http://localhost:3000/account/${user._id}/${sneaker._id}/favorite`,{},{withCredentials:true})
            }
            loadData()
            setSnackBar({
                text:`Deleted item from ${tableType==="cart" ? "cart" : "favorites"}`,
                bg:"lightcoral",
                open:true
            })
        }
    }

    const getAmount=(sneakerId)=>{
        if(user){
            for (const i of user.cartList) {
                if(i.sneaker==sneakerId){
                    return i.quantity
                }
            }
        }
        else{
            return ""
        }
    }

    return(
        <>

            {sneakers.length>0 &&
            <TableContainer component={Paper} id="tableContainer">

                <Table id="table" stickyHeader aria-label="favorite table">

                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Photo</TableCell>
                            <TableCell align="center">Name</TableCell>
                            {tableType==="cart" &&
                                <TableCell align="center">Amount</TableCell>
                            }
                            <TableCell align="center">Stock</TableCell>
                            <TableCell align="center">Price ($)</TableCell>
                            <TableCell align="center">Remove</TableCell>
                            
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {sneakers.map((product,key)=>{
                            return(<TableRow key={key} 
                            sx={product.items_left<getAmount(product._id) && {backgroundColor:"lightcoral"}}>
                                
                                <TableCell align="center">
                                    <Link to={`/sneaker/${product._id}`}>
                                        <img id="imgTable" src={product.imageURL} alt=""/>
                                    </Link>
                                </TableCell>

                                <TableCell align="center">
                                    <Link id="nameTable" to={`/sneaker/${product._id}`}><b>{product.name}</b></Link>
                                </TableCell>

                                {tableType==="cart" &&
                                    <TableCell className="cellText" align="center">{getAmount(product._id)}</TableCell>
                                }

                                <TableCell className="cellText" align="center">
                                    {product.items_left}
                                </TableCell>

                                <TableCell className="cellText" align="center">
                                    {product.price}
                                </TableCell>
                                
                                <TableCell align="center">
                                    <IconButton onClick={()=>{handleDelete(product)}}>
                                            <Close id="deleteBtn"/>
                                    </IconButton>
                                </TableCell>

                            </TableRow>)
                        })}
                    </TableBody>

                </Table>
            </TableContainer>
            }
        </>
    )
}