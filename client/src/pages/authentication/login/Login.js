import React,{useState,useEffect} from 'react';
import './login.css';
import { useHistory} from "react-router-dom";
import AuthService from "../../../authServices/apicalls";
import { Grid, Card, Box, Typography, ButtonGroup, Button, makeStyles, Paper } from '@material-ui/core';
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
    WrapBlock: {
        width: "960px",
        background: "#fff",
        borderRadius: "10px",
        overflow: "hidden",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between", 
        padding:"80px 100px"
    },
    loginPic: {
        width: "316px",
    },
    imgWidth:{
        maxWidth:"100%",
    },
    loginForm:{
        width: "320px"
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
    inputField:{
        fontFamily: "Poppins-Medium",
        fontSize: "15px",
        width: "100%",
        height:"50px",
        color:  theme.palette.primary.contrastText,
        lineHeight: "1.5",
        background: theme.palette.primary.dark,
        display: "block",
        borderRadius: "25px",
        padding:"0 30px 0 68px"
    }
}))

const LoginPage =()=> {
    const classes = useStyles();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const history = useHistory();

    const loginHandler = async (e) => {
        e.preventDefault();
        AuthService.login(email, password).then(
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

    useEffect(() => {
        if (AuthService.isAuthenticated()) {
            console.log('Redirecting to admin dashboard');
            history.push('/');
        }
      }, [history]);
      
    return (
        <React.Fragment>
            <Card container spacing= {1} className ={classes.gridContainer}>
                <Grid container className ={classes.WrapBlock}>
                    <Grid item md={7} xs={12} sm={12} >
                        <img className={classes.imgWidth} src={PcImg} alt="IMG"/>
                    </Grid>
                    
                    <Grid item md={5} xs={12} sm={12} >
                        <form onSubmit={loginHandler} className={classes.loginForm}>
                            <Typography className={classes.loginFormTitle}>
                                Member Login
                            </Typography>
                    
                    
                    <Grid item md={12} xs={12} sm={12} className={classes.wrapInput} >
						<input className={classes.inputField} type="email" name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required/>
						<span className="focus-input"></span>
						<span className="symbol-input">
							<i className="fa fa-envelope" aria-hidden="true"></i>
						</span>
                    </Grid>
					{/* </div> */}

					<div className="wrap-input" >
						<input className="inputField" type="password" name="pass" placeholder="Password"
                         onChange={(e) => setPassword(e.target.value)}
                         value={password}
                         required/>
						<span className="focus-input"></span>
						<span className="symbol-input">
							<i className="fa fa-lock" aria-hidden="true"></i>                            
						</span>
					</div>
                    {error && <div className="error-msg" role="alert">{error}</div>}
					<div className="container-login-form-btn">
						<button className="login-form-btn" type="submit" >
							Login
						</button>
					</div>

					<div className="forget-block">
						<span className="txt1">
							Forgot   
						</span>
						<a className="txt2" href="./reset-password">
							Password?
						</a>
					</div>
                </form>
     
                    <Box mt={2} width={1} >
                    </Box>
                    </Grid>                

               
               
                </Grid>
     
            </Card>    
        </React.Fragment>
    )
}

export default LoginPage;
