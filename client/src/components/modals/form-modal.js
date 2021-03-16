import React, { useState, useEffect } from 'react';
import { Grid, FormControl, MenuItem, DialogTitle, DialogContent, TextField, Checkbox, Button, FormControlLabel, Link, IconButton, makeStyles, Dialog, Typography, Box } from '@material-ui/core';
import {Rating, Alert} from '@material-ui/lab';
import CloseIcon from '@material-ui/icons/Close';
import moment from 'moment';
import axios from "axios";
import {OrganizationOptions} from '../../utils/list'

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
        width: "30%",
      },
      ratingStyle:{
        textAlign:"center"
      },

    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
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
    const [Number, setNumber] = useState("");
    const [Organization, setOrganization] = useState("");
    const [rating, setRating] = useState(0);
    const formattedTodayDate = moment().format("YYYY-MM-DD");
    const API = "https://formbackend11.herokuapp.com";

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
            rating:rating
        }
        // console.log(payload);
        axios.post(`${API}/form/data`,payload)
            .then(function (response) {
                props.closeModal();
                window.location.reload();
            })
            .catch(function (error) {
                setTimeout(() => {
                    setError("");
                }, 5000);
                return setError(error.response.data.message);   
            })
            event.preventDefault(event);        
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
                            <Grid item md={12} xs={12} sm={6}>
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
                            <Grid item md={12} xs={12} sm={6}>
                            <TextField
                                id="createdStartDate"
                                label="Date"
                                type="date"
                                onChange={(e) => setDate(e.target.value)}
                                defaultValue={formattedTodayDate}
                                className={classes.datePick}
                                fullWidth
                                InputLabelProps={{
                                shrink: true,
                                }}
                                format="DD/MM/YYYY"
                            />
                             
                                    
                            </Grid>
                            <Grid item md={12} xs={12} sm={6}>
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
                            <Grid item md={12} xs={12} sm={6}>
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
                            <Grid item md={12} xs={12} sm={6} className={classes.ratingStyle}>
                                <Rating 
                                    name="simple-controlled"
                                    value={rating}
                                    size= 'large'
                                    onChange={(e) => setRating(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
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