import React,{useState,useEffect} from 'react';
import './login/login.css';
import { useHistory} from "react-router-dom";
import AuthService from "../../authServices/apicalls";
import { Grid, Typography, ButtonGroup, Button, makeStyles, Paper } from '@material-ui/core';

const ResetPassword =()=> {
    const [email, setEmail] = useState("");   
    const [error, setError] = useState("");
    const history = useHistory();

    const passwordHandler = async (e) => {
        e.preventDefault();
        AuthService.reset(email).then(
            () => {
                history.push('/');                
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
            <div className = "container-login">
            <div className="reset-wrap">
               
                <form onSubmit={passwordHandler} className="login-form">
               
                    <span className="login-form-title">
                    Forgot Password? 🔒
                    </span>
                    <span className="reset-form-title">
                    Enter your email and we'll send you instructions to reset your password
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

                    {error && <div className="error-msg" role="alert">{error}</div>}
					<div className="container-login-form-btn">
						<button className="login-form-btn" type="submit" >
							Continue
						</button>
					</div>

					<div className="forget-block">
						<a className="txt1" href="./login">
                            Back to login
						</a>
					</div>
                </form>
            </div>
        </div>
    
        </React.Fragment>
    )
}

export default ResetPassword;
