import React,{useState, useEffect} from 'react';
import {Link, useHistory} from "react-router-dom";
import { Grid, Card, Typography, makeStyles} from '@material-ui/core';
import AuthService from "../../../authServices/apicalls";
import PcImg from '../../../assets/images/img-01.png';

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
    RegisterWrapBlock: {
        width: "960px",
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
            padding: "50px 80px 33px 80px"
          },
          [theme.breakpoints.up('md')]: {
            padding: "50px 90px 33px 85px"
          }
    },
    loginPic: {
        [theme.breakpoints.down('sm')]: {
            display: "none"
          },
          [theme.breakpoints.up('md')]: {
            width: "35%"
          },
          [theme.breakpoints.up('lg')]: {
            width: "316px",
          },
       
    },
    imgWidth:{
        maxWidth:"100%",
    },
    loginForm:{        
        [theme.breakpoints.up('sm')]: {
            width: "100%"
          },
          [theme.breakpoints.up('md')]: {
            width: "100%"
          },
          [theme.breakpoints.up('lg')]: {
            width: "320px"
          },
    },
    loginFormTitle:{
        fontFamily: "Poppins-Bold",
        fontSize: "24px",
        color:  theme.palette.openTitle,
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
    forgetBlock: {
        textAlign: "center",
        paddingTop: "12px"
    },
    txt1: {
        fontFamily: "Poppins-Regular",
        fontSize: "13px",
        lineHeight: "1.5",
        color: theme.palette.secondary.light
    },
    txt2: {
        fontFamily: "Poppins-Regular",
        fontSize: "13px",
        lineHeight: "1.5",
        marginLeft: "4px",
        color: theme.palette.secondary.contrastText
    }  
}))

function RegisterPage() {
    const classes = useStyles();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");    
    const [confirmpassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const history = useHistory();
    
    useEffect(() => {
        if (AuthService.isAuthenticated()) {
            console.log('Redirecting to admin dashboard');
            history.push('/');
        }
      }, [history]);

    const registerHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmpassword) {
            setPassword("");
            setConfirmPassword("");
            setTimeout(() => {
              setError("");
            }, 5000);
            return setError("Passwords do not match");
          }
      
        AuthService.register(username, email, password).then(
            () => {
            if (AuthService.isAuthenticated()) {
                    console.log('Redirecting to admin dashboard');
                    history.push('/');
                }
            },
            (error) => {
            setError(error.response.data.error);
            setTimeout(() => {
                setError("");
            }, 3000);
            }
        );
    };

    return (
        <React.Fragment>
            <Card container spacing= {1} className ={classes.gridContainer}>
                <Grid container className ={classes.RegisterWrapBlock}>
                    <Grid item md={7} xs={12} sm={12} className ={classes.loginPic} >
                        <img className={classes.imgWidth} src={PcImg} alt="IMG"/>
                    </Grid>
                    
                    <Grid item md={5} xs={12} sm={12} >
                        <form onSubmit={registerHandler} className={classes.loginForm}>
                            <Typography className={classes.loginFormTitle}>
                                Register Member
                            </Typography>    

                            <Grid item md={12} xs={12} sm={12} className={classes.wrapInput} >
                                <input className="inputField" type="text" name="text" placeholder="Full Name" value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required/>
                                <span className="focus-input"></span>
                                <span className="symbol-input">
                                    <i className="fa fa-user-circle" aria-hidden="true"></i>
                                </span>
                            </Grid>
                            
                            <Grid item md={12} xs={12} sm={12} className={classes.wrapInput} >
                                <input className="inputField" type="email" name="email" placeholder="Email" value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required/>
                                <span className="focus-input"></span>
                                <span className="symbol-input">
                                    <i className="fa fa-envelope" aria-hidden="true"></i>
                                </span>
                            </Grid>

                            <Grid item md={12} xs={12} sm={12} className={classes.wrapInput} >
                                <input className="inputField" type="password" name="pass" placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                required/>
                                <span className="focus-input"></span>
                                <span className="symbol-input">
                                    <i className="fa fa-lock" aria-hidden="true"></i>                            
                                </span>
                            </Grid>

                            <Grid item md={12} xs={12} sm={12} className={classes.wrapInput} >
                                <input className="inputField" type="password" name="pass" placeholder="Confirm Password"
                                value={confirmpassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required/>
                                <span className="focus-input"></span>
                                <span className="symbol-input">
                                    <i className="fa fa-lock" aria-hidden="true"></i>                            
                                </span>
                            </Grid>
                            
                            {error && <Grid item md={12} xs={12} sm={12} className={classes.errorMsg} role="alert">{error}</Grid>}
                            <Grid item md={12} xs={12} sm={12} className={classes.ContainerloginFormBtn} >
                                <button className={classes.loginFormBtn} type="submit" >
                                    Register
                                </button>
                            </Grid>
                            <Grid item md={12} xs={12} sm={12} className={classes.forgetBlock} >               
                                <span className={classes.txt1}>
                                    Already have an account?     
                                </span>
                                <Link className={classes.txt2} to="./login">
                                    Login
                                </Link>
                            </Grid>    
                        </form>
                    </Grid>
                </Grid>
            </Card>    
        </React.Fragment>
    )
}

export default RegisterPage
