import React, { useState, useEffect } from 'react';
import { Grid, FormControl, MenuItem, DialogTitle, DialogContent, TextField, Checkbox, Button, FormControlLabel, Link, IconButton, makeStyles, Dialog, Typography, Box } from '@material-ui/core';
import {Alert} from '@material-ui/lab';
import CloseIcon from '@material-ui/icons/Close';
import moment from 'moment';
import {OrganizationOptions, SourceOptions, DateFilterOptions} from "../../helpers/utils";
import AuthService from "../../authServices/apicalls";
const useStyles = makeStyles((theme) => ({
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
        left: "65%",
        top: "-5%",
        minHeight: '101%',
        [theme.breakpoints.down("xs")]: {
            width: "80%",
            top: "0",
            left: "0%",
            minHeight: '50%',
      },
      },
      ratingStyle:{
        textAlign:"center"
      },

    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin:"20px auto",
        background:"#01579b", 
        color:"#fff" ,

    },
    selectStyle: {
        minWidth: '100%'
    },
}));

const FormModal = (props) => {
    const classes = useStyles();
    const [Name, setName] = useState("");
    const [Date, setDate] = useState("");
    const [error, setError] = useState("");
    const [Email, setEmail] = useState('')
    const [Source, setSource] = useState("")
    const [Number, setNumber] = useState("");
    const [Organization, setOrganization] = useState("");
    const formattedTodayDate = moment().format("YYYY-MM-DD");

    useEffect(() => {
        // console.log(formattedTodayDate);
        setDate(formattedTodayDate);        
    }, []);
    
    const onSubmit = async (event) => {
        let payload ={
            name:Name,
            date:Date,
            phone:Number,
            organization:Organization,
            email:Email,
            source:Source
        }
        AuthService.createNewLead(payload).then(
            () => {
                props.closeModal();
                window.location.reload();
            },
            (error) => {
                setError(error.response.data.error);
                setTimeout(() => {
                    setError("");
                }, 3000);
            }
        )    
    };

    return (
        <React.Fragment>             
            <Dialog classes={{paper: classes.dialogPaper }}
                open={props.openModal} onClose={props.closeModal} disableBackdropClick fullWidth maxWidth="md" >
                <DialogTitle>
                    <IconButton style={{ backgroundColor: "#3f51b5",color:"#fff", float: "right" }} onClick={props.closeModal} >
                        <CloseIcon />
                    </IconButton>
                    {error ?<Alert severity="error">{error}</Alert>:''}
                </DialogTitle>
                <DialogContent>
                    <form onSubmit={onSubmit}>
                        <Grid container spacing={2}>
                            <Grid item md={12} xs={12} sm={12}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    onChange={(e) => setName(e.target.value)}
                                    id="name"
                                    label="User Name"
                                    name="name"
                                    required
                                    fullWidth
                                    autoFocus
                                />
                            </Grid>
                            <Grid item md={12} xs={12} sm={12}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    onChange={(e) => setNumber(e.target.value)}
                                    id="phone"
                                    type="number"
                                    label="Phone Number"
                                    name="phone"
                                    required
                                    fullWidth
                                    autoFocus
                                />
                            </Grid>
                            <Grid item md={12} xs={12} sm={12}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    onChange={(e) => setEmail(e.target.value)}
                                    id="email"
                                    type="email"
                                    label="Email"
                                    name="email"
                                    required
                                    fullWidth
                                    autoFocus
                                />
                            </Grid>
                            <Grid item md={12} xs={12} sm={12}>
                                <FormControl className={classes.selectStyle}>
                                    <TextField
                                        size="small"
                                        select
                                        label="Organization"
                                        name="Organization"
                                        value={Organization}
                                        onChange={(e) => setOrganization(e.target.value)}
                                        defaultValue="Choose any Value" >
                                        {OrganizationOptions.map((option, index) => <MenuItem key={index} value={option.value}>{option.text}</MenuItem>)}
                                    </TextField>
                                </FormControl>
                            </Grid>
                            <Grid item md={12} xs={12} sm={12}>
                                <FormControl className={classes.selectStyle}>
                                    <TextField
                                        size="small"
                                        select
                                        label="Source"
                                        name="Source"
                                        value={Source}
                                        onChange={(e) => setSource(e.target.value)}
                                        defaultValue="Choose any Value" >
                                        {SourceOptions.map((option, index) => <MenuItem key={index} value={option.value}>{option.text}</MenuItem>)}
                                    </TextField>
                                </FormControl>
                            </Grid>
                            
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            className={classes.submit}
                        >
                            Submit Data
                        </Button>

                    </form>
                </DialogContent>

            </Dialog>
        </React.Fragment>
    );
}

export default FormModal;