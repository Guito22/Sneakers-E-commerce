import React from 'react';
import { Typography, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Box, Paper } from '@mui/material';
import PaymentModal from './PaymentModal';
import { sessionContext } from '../Contexts';
import { useContext } from 'react';

export default function PaymentSection(){
  // Define payment methods
  const {user,sneakers} = useContext(sessionContext)

  const paymentMethods = [
    { value: 'credit_card', label: 'Credit Card' },
    { value: 'paypal', label: 'PayPal' },
    { value: 'bank_transfer', label: 'Bank Transfer' },
  ];
  const totalToPay = ()=>{
    let total = 0
    if(user){
      for (const i of user.cartList) {
        for (const j of sneakers) {
          if(i.sneaker==j._id){
            total+=(i.quantity*j.price)
          }
        }
      }
    }
    return total
  }

  return (
    <Box  sx={{ mt: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', py: 4 }}>
      
      <Paper id="paymentBox" elevation={3} sx={{ p: 4, minWidth: '300px', borderRadius: '12px' }}>
        {/* Total Amount Display */}
        <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
          Total to Pay: ${totalToPay()}
        </Typography>

        {/* Payment Method Selection */}
        <FormControl component="fieldset" fullWidth>
          <FormLabel component="legend" sx={{ mb: 2, fontWeight: 'medium',color:"gray" }}>Select Payment Method</FormLabel>
          
          <RadioGroup
            aria-label="payment method"
            defaultValue={paymentMethods[0].value}
            name="payment-methods-group">

            {paymentMethods.map((method) => (
              <FormControlLabel key={method.value} value={method.value} control={<Radio />} label={method.label} sx={{ '& .MuiSvgIcon-root': { fontSize: 28 }, mb: 1 }} />
            ))}
          </RadioGroup>

          <PaymentModal/>
        </FormControl>
      </Paper>
    </Box>
  );
};
