import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { Grid, MenuItem, DialogContent, TextField, IconButton, makeStyles, Dialog} from '@material-ui/core';
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import FormControl from '@material-ui/core/FormControl';
import { SourceOptions, CenterOptions, PriorityOptions, DepartmentOptions, PropertyNameOptions, CategoryOptions} from "../../helpers/utils";
const useStyles = makeStyles((theme) => ({
  Button: {
    margin:"20px auto",
    background:"#01579b", 
    color:"#fff" ,
},
selectStyle: {
    minWidth: '100%'
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


const LeadInfoModal=({value,handleChange, nextStep, prevStep, closeModal, openModal})=>{
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
        Enter Leads Information
        <IconButton  style={{ backgroundColor: "#3f51b5",color:"#fff", float: "right" }} onClick={closeModal}  >
                        <CloseIcon />
                    </IconButton>
      </DialogTitle>
      <DialogContent>
                    <form >
                        <Grid container spacing={2}>
                            <Grid item md={12} xs={12} sm={12}>
                                <FormControl className={classes.selectStyle}>
                                    <TextField
                                        size="large"
                                        select
                                        label="Lead Status"
                                        name="priority"
                                        id="priority"
                                        onChange={handleChange('priority')}
                                        defaultValue={value.priority} >
                                        {PriorityOptions.map((option, index) => <MenuItem key={index} value={option.value}>{option.text}</MenuItem>)}
                                    </TextField>
                                </FormControl>
                            </Grid>
                            <Grid item md={12} xs={12} sm={12}>
                                <TextField
                                    variant="outlined"
                                    id="expectedAmount"
                                    label="expectedAmount"
                                    type="Number"
                                    name="expectedAmount"
                                    fullWidth
                                    autoFocus
                                    onChange={handleChange('expectedAmount')}
                                    defaultValue={value.expectedAmount}
                                />
                            </Grid>
                            <Grid item md={12} xs={12} sm={12}>
                                <TextField
                                    variant="outlined"
                                    id="location"
                                    label="Location"
                                    type="String"
                                    name="location"
                                    fullWidth
                                    autoFocus
                                    onChange={handleChange('location')}
                                    defaultValue={value.location}
                                />
                            </Grid>
                            <Grid item md={6} xs={6} sm={6}>
                        <Button
                            type="danger"
                            fullWidth
                            variant="contained"
                            onClick={prevStep}
                            className={classes.Button}
                             >
                            Back
                        </Button>
                        </Grid>
                        <Grid item md={6} xs={6} sm={6}>
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

                        </Grid>
                    </form>
        </DialogContent>
    </React.Fragment>
  </Dialog>
</MuiThemeProvider>
  )
}



export default LeadInfoModal;