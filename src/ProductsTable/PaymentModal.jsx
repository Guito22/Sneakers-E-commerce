import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import {sessionContext} from "../Contexts"
import { useContext,useState } from 'react';
import { useNavigate } from 'react-router';

export default function PaymentModal() {
  const [open, setOpen] = useState(false);
  const {user,loadData} = useContext(sessionContext)
  const navigate = useNavigate()

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const payCart = async ()=>{
    const res = await axios.delete(`http://localhost:3000/account/${user._id}/cart/pay`,{withCredentials:true})
    loadData()
    handleClose()
    navigate(`/${user._id}/cart`)
  } 
  const setTheme = ()=>{
    const root = document.querySelector("#root")
    return root.getAttribute("data-theme")
  }

  return (
    <div>
      <button className='btn btn-success' id='btnPaymentForm' onClick={handleOpen}>Pay</button>
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
      
        <Box id="modalBox" data-theme={setTheme()}>
          <button 
            className='btn btn-close' 
            id='closeModal'
            onClick={handleClose}>
          </button>

          <Typography id="modal-modal-title" variant="h4" component="h2">
            Payment Confirmation
          </Typography>

          <Typography id="modal-modal-description" sx={{ mt: 2 , marginRight:"2rem"}}>
            Are you sure you want to proceed with the payment?
          </Typography>

          <div className="mt-3 d-flex justify-content-end ">
            <button className="btn btn-primary" onClick={payCart}>Yes</button>
            <button className="btn btn-secondary" onClick={handleClose}>No</button>
          </div>

        </Box>
      </Modal>
    </div>
  );
}
