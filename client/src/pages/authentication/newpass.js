import React,{useState,useEffect} from 'react';
import './login/login.css';
import { useHistory, useParams} from "react-router-dom";
import AuthService from "../../authServices/apicalls";
import { Grid, Typography, ButtonGroup, Button, makeStyles, Paper } from '@material-ui/core';

const NewPassword =()=> {
    const [password, setPassword] = useState("");    
    const [confirmpassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const history = useHistory();
    const { id } = useParams();
    const newpasswordHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmpassword) {
            setPassword("");
            setConfirmPassword("");
            setTimeout(() => {
              setError("");
            }, 5000);
            return setError("Passwords do not match");
        }
        AuthService.newpassword(password, id).then(
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
               
                <form onSubmit={newpasswordHandler} className="login-form">
               
                    <span className="login-form-title">
                    Create New Password
                    </span>
                    <span className="reset-form-title">
                    Your new Password must be different from previous used passwords.
                    </span>
                  

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

                    <div className="wrap-input" >
						<input className="inputField" type="password" name="pass" placeholder="Confirm Password"
                         value={confirmpassword}
                         onChange={(e) => setConfirmPassword(e.target.value)}
                         required/>
						<span className="focus-input"></span>
						<span className="symbol-input">
							<i className="fa fa-lock" aria-hidden="true"></i>                            
						</span>
					</div>
                    
                    {error && <div className="error-msg" role="alert">{error}</div>}

					<div className="container-login-form-btn">
						<button className="login-form-btn" type="submit" >
							Set Password
						</button>
					</div>
                </form>
            </div>
        </div>
    
        </React.Fragment>
    )
}

export default NewPassword;
