import React,{useState, useEffect} from 'react';
import '../login/login.css';
import { useHistory} from "react-router-dom";
import AuthService from "../../../authServices/apicalls";
import PcImg from '../../../assets/images/img-01.png';

function RegisterPage() {
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
            <div className = "container-login">
            <div className="wrap-login">
                <div className="login-pic" >
					<img src={PcImg} alt="IMG"/>
                </div>
                <form onSubmit={registerHandler} className="login-form">
               
                    <span className="login-form-title">
                        Register Member 
                    </span>
                    
                    <div className="wrap-input" >
						<input className="inputField" type="text" name="text" placeholder="Full Name" value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required/>
						<span className="focus-input"></span>
						<span className="symbol-input">
							<i className="fa fa-user-circle" aria-hidden="true"></i>
						</span>
					</div>

                    <div className="wrap-input" >
						<input className="inputField" type="email" name="email" placeholder="Email" value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
							Register
						</button>
					</div>

					<div className="forget-block">
						<span className="txt1">
                        Already have an account?    
						</span>
						<a className="txt2" href="/login">
                            Login
						</a>
					</div>
                </form>
            </div>
        </div>
    
        </React.Fragment>
    )
}

export default RegisterPage
