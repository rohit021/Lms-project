import React, { useState, useEffect } from 'react';
import { Grid, FormControl, MenuItem, DialogTitle, DialogContent, Label, TextField, Button, IconButton, makeStyles, Dialog, Typography} from '@material-ui/core';
import {Alert, Rating} from '@material-ui/lab';
import CloseIcon from '@material-ui/icons/Close';
import moment from 'moment';
import { SourceOptions, CenterOptions, PriorityOptions, DepartmentOptions} from "../../helpers/utils";
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
    const [StarRating, setStarRating] = useState("");
    const [Date, setDate] = useState("");
    const [error, setError] = useState("");
    const [Comment, setComment] = useState('')
    const [Reply, setReply] = useState("")
    const [Center, setCenter] = useState("")
    const [Platform, setPlatform] = useState("")
    const formattedTodayDate = moment().format("YYYY-MM-DD");

    useEffect(() => {
        // console.log(formattedTodayDate);
        setDate(formattedTodayDate);        
    }, []);
    
    const onSubmit = async (event) => {
        let payload ={
            name: Name,
            date: Date,
            comment:Comment,
            rating: StarRating,
            organization:props.organization,
            center: Center,
            platform: Platform,
            reply: Reply
        }
        AuthService.createNewReview(payload)
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
                open={props.openModal}  disableBackdropClick fullWidth maxWidth="md" >
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
                                    onChange={(e) => setComment(e.target.value)}
                                    id="comment"
                                    label="Customer Comment"
                                    name="comment"
                                    required
                                    fullWidth
                                    autoFocus
                                />
                                </Grid>
                            <Grid item md={12} xs={12} sm={12}>
                                <TextField
                                    variant="outlined"
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
                                <Typography variant="h6" component="h5" >
                                    Ratings
                                </Typography>
                                <Rating
                                    style={{textAlign:"center"}}
                                    name="rating"
                                    // value={value}
                                    onChange={(event, newValue) => {
                                        setStarRating(newValue);
                                    }}
                                />
                            </Grid>
                            <Grid item md={12} xs={12} sm={12}>
                                <FormControl className={classes.selectStyle}>
                                    <TextField
                                         variant="outlined"
                                         onChange={(e) => setReply(e.target.value)}
                                         id="reply"
                                         label="Reply"
                                         name="reply"
                                         fullWidth
                                         autoFocus/>
                                </FormControl>
                            </Grid>        
                            <Grid item md={12} xs={12} sm={12}>
                                <FormControl className={classes.selectStyle}>
                                    <TextField
                                        size="small"
                                        select
                                        label="Center"
                                        name="center"                                        
                                        required
                                        value={Center}
                                        onChange={(e) => setCenter(e.target.value)}
                                        defaultValue="Choose any Value" >
                                        {CenterOptions.map((option, index) => <MenuItem key={index} value={option.value}>{option.text}</MenuItem>)}
                                    </TextField>
                                </FormControl>
                            </Grid>                           
                            <Grid item md={12} xs={12} sm={12}>
                                    <FormControl className={classes.selectStyle}>
                                        <TextField
                                            size="small"
                                            select
                                            label="Platform"
                                            name="platform"                                        
                                            required
                                            value={Platform}
                                            onChange={(e) => setPlatform(e.target.value)}
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