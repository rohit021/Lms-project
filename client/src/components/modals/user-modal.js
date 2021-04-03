import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { Grid, FormControl, MenuItem, DialogContent, TextField, IconButton, makeStyles, Dialog} from '@material-ui/core';
import DialogTitle from '@material-ui/core/DialogTitle'
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
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


const UserDetailsModal=({value,handleChange,closeModal, openModal, nextStep})=>{
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
        Enter User Details
        <IconButton style={{ backgroundColor: "#3f51b5",color:"#fff", float: "right" }} onClick={closeModal}  >
                        <CloseIcon />
                    </IconButton>
      </DialogTitle>
      <DialogContent>
                    <form >
                        <Grid container spacing={2}>
                            <Grid item md={12} xs={12} sm={12}>
                                <TextField
                                    variant="outlined"
                                    onChange={handleChange('name')}
                                    defaultValue={value.name}
                                    id="name"
                                    label="User Name"
                                    name="name"
                                    // required
                                    fullWidth
                                    autoFocus
                                />
                            </Grid>
                            <Grid item md={12} xs={12} sm={12}>
                                <TextField
                                    variant="outlined"
                                    onChange={handleChange('phone')}
                                    defaultValue={value.phone}
                                    id="phone"
                                    label="Phone Number"
                                    name="name"
                                    // required
                                    fullWidth
                                    autoFocus
                                />
                            </Grid>
                            <Grid item md={12} xs={12} sm={12}>
                                <TextField
                                    variant="outlined"
                                    onChange={handleChange('email')}
                                    defaultValue={value.email}
                                    id="email"
                                    label="Email"
                                    name="email"
                                    // required
                                    fullWidth
                                    autoFocus
                                />
                            </Grid>
                            <Grid item md={12} xs={12} sm={12}>
                                <TextField
                                    variant="outlined"
                                    onChange={handleChange('source')}
                                    defaultValue={value.source}
                                    id="source"
                                    label="Source"
                                    name="source"
                                    // required
                                    fullWidth
                                    autoFocus
                                />
                            </Grid>
                            <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            onClick={nextStep}
                            className={classes.Button}
                             >
                            Continue
                        </Button>
                        </Grid>
                    </form>
        </DialogContent>
    </React.Fragment>
  </Dialog>
</MuiThemeProvider>
  )
}



export default UserDetailsModal;