import React,{useState,useEffect} from 'react';
import { Link, useHistory} from "react-router-dom";
import AuthService from "../../authServices/apicalls";
import { Grid, Typography, Card, makeStyles } from '@material-ui/core';
import {CircularProgress} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    gridContainer: {
        width: "100%", 
        minHeight: "100vh",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        padding: "15px",
        background: theme.palette.backgroundGradient,
    },
    ResetWrap :{
        width: "460px",
        background: "#fff",
        borderRadius: "10px",
        overflow: "hidden",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between", 
        [theme.breakpoints.up('xs')]: {
            padding: "50px 15px 33px 15px"
          },
        [theme.breakpoints.up('sm')]: {
            padding: "50px 15px 33px 15px"
          },
          [theme.breakpoints.up('md')]: {
            padding: "50px 30px 30px 30px"
          }
    },
    loginForm:{        
        [theme.breakpoints.up('sm')]: {
            width: "100%"
          },
          [theme.breakpoints.up('md')]: {
            width: "100%"
          },
    },
    loginFormTitle:{
        fontFamily: "Poppins-Bold",
        fontSize: "24px",
        color: theme.palette.openTitle,
        lineHeight: "1.2",
        textAlign: "center",
        width: "100%",
        display: "block",
        paddingBottom: "54px"
    },
    ResetFormTitle: {
        fontFamily: "Poppins-Bold",
        fontSize: "16px",
        color: theme.palette.primary.red,
        lineHeight: "1.2",
        textAlign: "center",
        width: "100%",
        display: "block",
        paddingBottom: "54px"
      },
      
    wrapInput: {
        position: "relative",
        zIndex: "1",
        marginBottom: "15px"
    },
    errorMsg: {
        textAlign: "center",
        width: "100%",
        fontWeight: "600",
        fontSize: "16px",
        color:  theme.palette.primary.red, 
    },
    successMsg:{
        textAlign: "center",
        width: "100%",
        fontWeight: "600",
        fontSize: "16px",
        color:  theme.palette.primary.green, 
    },
    ContainerloginFormBtn: {
        width: "100%",      
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        paddingTop: "20px"
    },
    loginFormBtn: {
        fontFamily: "Montserrat-Bold",
        fontSize: "15px",
        lineHeight: "1.5",
        color:  theme.palette.primary.light, 
        textTransform: "uppercase",
        width: "100%",      
        height: "50px",
        borderRadius: "25px",
        background: theme.palette.primary.blue, 
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "0 25px",
        transition: "all 0.4s",
        "&:hover":{
            background: theme.palette.secondary.dark, 
        }
    },
    LinkBlock: {
        textAlign: "center",
        paddingTop: "12px"
    },
    txt2: {
        fontFamily: "Poppins-Regular",
        fontSize: "13px",
        lineHeight: "1.5",
        marginLeft: "4px",
        color: theme.palette.secondary.contrastText
    }  
}))

const ResetPassword =()=> {
    const classes = useStyles();
    const [email, setEmail] = useState("");   
    const [error, setError] = useState("");
    const history = useHistory();
    const [loading, setloading] = useState(false)
    const [emailSent, setemailSent] = useState(false);
    
    const passwordHandler = async (e) => {
        e.preventDefault();
        setloading(true);
        AuthService.reset(email).then(
            () => {
              
                setemailSent(true);                
                setTimeout(() => history.push('/'), 4000);
                setloading(false);   
            },
            (error) => {
                setloading(false);
                setError(error.response.data.error);
                setTimeout(() => {
                    setError("");
                }, 3000);
            }
        );
    };

    useEffect(() => {
        if (AuthService.isAuthenticated()) {
            console.log('Redirecting to admin dashboard');
            history.push('/');
        }
      }, [history]);
    
    return (
        <React.Fragment>
            <Card container spacing= {1} className ={classes.gridContainer}>           
                <Grid container className ={classes.ResetWrap}>
                    <Grid item md={12} xs={12} sm={12} >
                        <form onSubmit={passwordHandler} className={classes.loginForm}>
                            <Typography className={classes.loginFormTitle}>
                                Forgot Password? 🔒
                            </Typography>
                            <Typography className={classes.ResetFormTitle}>
                                Enter your email and we'll send you instructions to reset your password
                            </Typography>
                            <Grid item md={12} xs={12} sm={12} className={classes.wrapInput} >        
                                <input className="inputField" type="email" name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                required/>
                                <span className="focus-input"></span>
                                <span className="symbol-input">
                                    <i className="fa fa-envelope" aria-hidden="true"></i>
                                </span>
                            </Grid>
                            {emailSent && <Grid item md={12} xs={12} sm={12} className={classes.successMsg} role="alert">Check your Email we have sent an mail</Grid>}
                            {error && <Grid item md={12} xs={12} sm={12} className={classes.errorMsg} role="alert">{error}</Grid>}
                            <Grid item md={12} xs={12} sm={12} className={classes.ContainerloginFormBtn} >
                                {!loading ? <button disabled={emailSent} className={classes.loginFormBtn} type="submit" >
                                    Continue
                                </button> : <CircularProgress/>
                                }
                            </Grid> 
                            <Grid item md={12} xs={12} sm={12} className={classes.LinkBlock} >               
                                <Link className={classes.txt2} to="./login">
                                    Back to login
                                </Link>
                            </Grid>  
                        </form>
                    </Grid>  
                </Grid>     
            </Card>        
        </React.Fragment>
    )
}

export default ResetPassword;
