import React, { useState, useEffect } from 'react';
import { Grid, FormControl, MenuItem, DialogTitle, DialogContent, TextField, Button, IconButton, makeStyles, Dialog} from '@material-ui/core';
import {Alert} from '@material-ui/lab';
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

const FormModal = ({id, reload, status, closeModal, openModal, organization}) => {
    const classes = useStyles();
    const [Name, setName] = useState("");
    const [Number, setNumber] = useState("");
    const [Date, setDate] = useState("");
    const [error, setError] = useState("");
    const [Email, setEmail] = useState('')
    const [Location, setLocation] = useState("")
    const [Department, setDepartment] = useState("")
    const [Center, setCenter] = useState("")
    const [Source, setSource] = useState("")
    const [Amount, setAmount] = useState("")
    const [Priority, setPriority] = useState("")
    const formattedTodayDate = moment().format("YYYY-MM-DD");
    
    useEffect(() => {
        // console.log(formattedTodayDate);
        setDate(formattedTodayDate);        
    }, []);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData =()=>{
        AuthService.FindLeadbyId(id).then(
            (data) => {
                setName(data.name);
                setNumber(data.phone);
                setEmail(data.email);
                setCenter(data.center);
                setAmount(data.amount);
                setLocation(data.location);
                setPriority(data.priority);
                setSource(data.source);
                setDepartment(data.department);
            },
            (error) => {
                console.log(error);
            }
        );
    }
    
    const onSubmit = async (event) => {
        let payload ={
            id:id,
            name: Name,
            phone: Number,
            organization:organization,
            email: Email,
            source: Source,
            amount: Amount,
            location: Location,
            center: Center,
            department: Department,
            priority: Priority
        }
        if(status ==="add"){
            payload['date']=Date;
            AuthService.createNewLead(payload)
            .then(function (response) {
                closeModal();
                window.location.reload();
            })
            .catch(function (error) {
                setTimeout(() => {
                    setError("");
                }, 5000);
                return setError(error.response.data.message);   
            })  
        } else {
            AuthService.updateLead(payload)
            .then(function (response) {
                closeModal();
                reload();
            })
            .catch(function (error) {
                setTimeout(() => {
                    setError("");
                }, 5000);
                return setError(error.response.data.message);   
            })  
        }        
        event.preventDefault(event);      
    };
    return (
        <React.Fragment>             
            <Dialog classes={{paper: classes.dialogPaper }}
                open={openModal}  disableBackdropClick fullWidth maxWidth="md" >
                <DialogTitle>
                    <IconButton style={{ backgroundColor: "#3f51b5",color:"#fff", float: "right" }} onClick={closeModal} >
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
                                    onChange={(e) => setName(e.target.value)}
                                    value={Name}
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
                                    onChange={(e) => setNumber(e.target.value)}
                                    value={Number}
                                    id="Number"
                                    type="number"
                                    label="Phone Number"
                                    name="Number"
                                    required
                                    fullWidth
                                    autoFocus
                                />
                            </Grid>
                            <Grid item md={12} xs={12} sm={12}>
                                <TextField
                                    variant="outlined"
                                    onChange={(e) => setEmail(e.target.value)}
                                    id="email"
                                    value={Email}
                                    type="email"
                                    label="Email"
                                    name="email"
                                    required
                                    fullWidth
                                    autoFocus
                                />
                            </Grid>
                            <Grid item md={12} xs={12} sm={12}>
                                <TextField
                                    variant="outlined"
                                    onChange={(e) => setLocation(e.target.value)}
                                    id="Location"
                                    type="String"
                                    label="Location"
                                    value={Location}
                                    name="Location"
                                    fullWidth
                                    autoFocus
                                />
                            </Grid>                           
                            <Grid item md={12} xs={12} sm={12}>
                                <FormControl className={classes.selectStyle}>
                                    <TextField
                                        size="small"
                                        select
                                        label="Department"
                                        name="Department"                                        
                                        required
                                        value={Department}
                                        onChange={(e) => setDepartment(e.target.value)}
                                        defaultValue="Choose any Value" >
                                        {DepartmentOptions.map((option, index) => <MenuItem key={index} value={option.value}>{option.text}</MenuItem>)}
                                    </TextField>
                                </FormControl>
                            </Grid>
                            <Grid item md={12} xs={12} sm={12}>
                                <FormControl className={classes.selectStyle}>
                                    <TextField
                                        size="small"
                                        select
                                        label="Center"
                                        name="Center"
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
                                        label="Priority"
                                        name="Priority"
                                        value={Priority}
                                        onChange={(e) => setPriority(e.target.value)}
                                        defaultValue="Choose any Value" >
                                        {PriorityOptions.map((option, index) => <MenuItem key={index} value={option.value}>{option.text}</MenuItem>)}
                                    </TextField>
                                </FormControl>
                            </Grid>
                            <Grid item md={12} xs={12} sm={12}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    onChange={(e) => setAmount(e.target.value)}
                                    id="Amount"
                                    type="number"
                                    value={Amount}
                                    label="Amount"
                                    name="Amount"
                                    InputProps={{ inputProps: { min: 0 } }}
                                    required
                                    autoFocus
                                />
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
                        {status ==="add"? (
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            className={classes.submit}
                        >
                            Submit Data
                        </Button>
                        ):
                        <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        className={classes.submit}
                    >
                        Updata Data
                    </Button>}
                    </form>
                </DialogContent>

            </Dialog>
        </React.Fragment>
    );
}

export default FormModal;