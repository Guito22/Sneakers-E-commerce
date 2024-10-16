import { useContext } from "react"
import { snackBarContext } from "./Contexts"
import { Snackbar,IconButton} from "@mui/material";
import { Close } from "@mui/icons-material";

//snackBar called to show status messages
export default function ActionSnackbar(){
    const {snackBar,setSnackBar} = useContext(snackBarContext)

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setSnackBar({...snackBar,open:false}) // Close the Snackbar
      };

    return(
        <Snackbar
        open={snackBar.open}
        autoHideDuration={2500}
        onClose={handleSnackbarClose}
        message={snackBar.text}
        sx={{
            '& .MuiSnackbarContent-root': {
              backgroundColor: snackBar.bg, // Set the background color to white
              color: 'black',
              fontWeight:"bold" // Set the text color to black for contrast
            },
          }}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color='inherit'
            onClick={handleSnackbarClose}>
              
            <Close fontSize="small" />
          </IconButton>
        }
        />

    )
}