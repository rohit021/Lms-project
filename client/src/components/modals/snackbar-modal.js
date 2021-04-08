import {Children, React,useEffect,useState} from "react";
import {Snackbar} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

 const Alert=(props)=> {
    return <MuiAlert elevation={6} variant="filled"  {...props} />;
  }
  
 
const SnackBar =({children, variant, open})=>{
  const[Open,setOpen]=useState(open);

//   useEffect(()=>{
//     setOpen(true);
//   },[])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return; 
    
    }
    open=false;
    setOpen(false);

  };
return(
    <Snackbar open={Open} autoHideDuration={2000} onClose={handleClose}
    anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    
    >
    <Alert onClose={handleClose} severity={variant}>
     {children}
    </Alert>
  </Snackbar>
  
);

}
export default SnackBar;