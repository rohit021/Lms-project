import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { Grid, FormControl, MenuItem, DialogContent, TextField, IconButton, makeStyles, Dialog} from '@material-ui/core';
import DialogTitle from '@material-ui/core/DialogTitle'
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';

import { List, ListItem, ListItemText } from '@material-ui/core/';
const useStyles = makeStyles((theme) => ({

  Button: {
    margin:"20px auto",
    background:"#01579b", 
    color:"#fff" ,
},
paper: {
  marginTop: theme.spacing(8),
  display: 'flex',
  width: "50px",
  flexDirection: 'column',
  alignItems: 'center',
},
dialogPaper: {
  position: 'absolute',
  width: "33%",
  [theme.breakpoints.down("md")]: {
    width: "40%",
  },
  [theme.breakpoints.down("xs")]: {
    width: "80%"
},
},

}));



const ConfirmModal=({value,prevStep,closeModal, openModal, nextStep, saveData})=>{
  const classes=useStyles();
 
  return(
<MuiThemeProvider>
  <Dialog classes={{paper: classes.dialogPaper }}
    open={openModal}
      fullWidth='sm'
      maxWidth='sm'
    >
    <React.Fragment>
      <DialogTitle>
        Confirm Details
        <IconButton style={{ backgroundColor: "#3f51b5",color:"#fff", float: "right" }} onClick={closeModal}  >
                        <CloseIcon />
                    </IconButton>
      </DialogTitle>
      <DialogContent>
                            
      <Grid container spacing={2} value="Container" >
                              <Grid item md={6} xs={6} sm={6}>
                                <TextField
                                 variant="outlined"
                                   primary="Name"
                                   secondary="done"
                                   value="field"
                                   label="Name"
                                   aria-readonly
                                >Done
                                </TextField>
                            </Grid>
                            <Grid item md={6} xs={6} sm={6}>
                                <TextField
                                 variant="outlined"
                                   primary="Name"
                                   secondary="done"
                                   value="field"
                                   label="Name"
                                   aria-readonly
                                >Done
                                </TextField>
                            </Grid>
                            <Grid item md={6} xs={6} sm={6}>
                                <TextField
                                 variant="outlined"
                                   primary="Name"
                                   secondary="done"
                                   value="field"
                                   label="Name"
                                   aria-readonly
                                >Done
                                </TextField>
                            </Grid>
                            <Grid item md={6} xs={6} sm={6}>
                                <TextField
                                 variant="outlined"
                                   primary="Name"
                                   secondary="done"
                                   value="field"
                                   label="Name"
                                   aria-readonly
                                >Done
                                </TextField>
                            </Grid>
            </Grid>

            <Divider variant="middle" width="10px" />
            <Grid container  spacing={2} >
                              <Grid item md={4} xs={4} sm={4} >
                                <TextField
                                 variant="outlined"
                                   primary="Name"
                                   secondary="done"
                                   value="field"
                                   label="Name"
                                   aria-readonly
                                >Done
                                </TextField>
                            </Grid>
                            <Grid item md={4} xs={4} sm={4}>
                                <TextField
                                 variant="outlined"
                                   primary="Name"
                                   secondary="done"
                                   value="field"
                                   label="Name"
                                   aria-readonly
                                >Done
                                </TextField>
                            </Grid>
                            <Grid item md={4} xs={4} sm={4}>
                                <TextField
                                 variant="outlined"
                                   primary="Name"
                                   secondary="done"
                                   value="field"
                                   label="Name"
                                   aria-readonly
                                >Done
                                </TextField>
                            </Grid>

             </Grid>



        </DialogContent>
    </React.Fragment>
  </Dialog>
</MuiThemeProvider>
  )
}



export default ConfirmModal;