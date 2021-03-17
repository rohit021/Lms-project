import React,{useState,useEffect} from 'react';
import './login.css';
import { useHistory} from "react-router-dom";
import AuthService from "../../../authServices/apicalls";
import { Grid, Card, Typography, ButtonGroup, Button, makeStyles, Paper } from '@material-ui/core';
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
        background: "linear-gradient(-135deg, #fa09ea, #4158d0)",
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
        // margin: "0 auto",        
        // width: "70%",
        // padding: 12,
        // border: "1px solid",
        // marginTop: 8,
        // marginBottom: 18,
        // justifyContent:"center",
        // boxShadow: '1px 3px 5px 3px #d4d0d0',
        // "align-items": "center",
    // },
    dateBox: {
        border: "1px solid",        
    },
    datePick: {
        margin:"0 5px",
        width:"40%"
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
                <Grid item className ={classes.WrapBlock}>
                <div className="login-pic" >
					<img src={PcImg} alt="IMG"/>
                </div>
                <form onSubmit={loginHandler} className="login-form">
               
                    <span className="login-form-title">
                        Member Login
                    </span>
                    
                    <div className="wrap-input" >
						<input className="inputField" type="email" name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required/>
						<span className="focus-input"></span>
						<span className="symbol-input">
							<i className="fa fa-envelope" aria-hidden="true"></i>
						</span>
					</div>

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
     
                </Grid>
     
            </Card>    
        </React.Fragment>
    )
}

export default LoginPage;
