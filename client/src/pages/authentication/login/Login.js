import React,{useState,useEffect} from 'react';
import './login.css';
import { useHistory} from "react-router-dom";
import AuthService from "../../../authServices/apicalls";
import PcImg from '../../../assets/images/img-01.png';

const LoginPage =()=> {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const history = useHistory();

    const loginHandler = async (e) => {
        e.preventDefault();
        AuthService.login(email, password).then(
            () => {
            history.push("/");
            window.location.reload();
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
        if (localStorage.getItem("authToken")) {
          history.push("/");
        }
      }, [history]);
      
    return (
        <React.Fragment>
            <div className = "container-login">
            <div className="wrap-login">
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
						<a className="txt2" href="#">
							Password?
						</a>
					</div>
                </form>
            </div>
        </div>
    
        </React.Fragment>
    )
}

export default LoginPage;
