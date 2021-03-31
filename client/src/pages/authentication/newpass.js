import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from "react-router-dom";
import AuthService from "../../authServices/apicalls";
import { Grid, Typography, Card, makeStyles } from '@material-ui/core';

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
    ResetWrap: {
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
    loginForm: {
        [theme.breakpoints.up('sm')]: {
            width: "100%"
        },
        [theme.breakpoints.up('md')]: {
            width: "100%"
        },
    },
    loginFormTitle: {
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
        color: theme.palette.primary.red,
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
        color: theme.palette.primary.light,
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
        "&:hover": {
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

const NewPassword = () => {
    const classes = useStyles();
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
                    history.push('/');
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
            <Card container spacing={1} className={classes.gridContainer}>
                <Grid container className={classes.ResetWrap}>
                    <Grid item md={12} xs={12} sm={12} >
                        <form onSubmit={newpasswordHandler} className={classes.loginForm}>
                            <Typography className={classes.loginFormTitle}>
                                Create New Password
                                </Typography>
                            <Typography className={classes.ResetFormTitle}>
                                Your new Password must be different from previous used passwords.
                            </Typography>
                            <Grid item md={12} xs={12} sm={12} className={classes.wrapInput} >
                                <input className="inputField" type="password" name="pass" placeholder="Password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    required />
                                <span className="focus-input"></span>
                                <span className="symbol-input">
                                    <i className="fa fa-lock" aria-hidden="true"></i>
                                </span>
                            </Grid>
                            <Grid item md={12} xs={12} sm={12} className={classes.wrapInput} >
                                <input className="inputField" type="password" name="pass" placeholder="Confirm Password"
                                    value={confirmpassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required />
                                <span className="focus-input"></span>
                                <span className="symbol-input">
                                    <i className="fa fa-lock" aria-hidden="true"></i>
                                </span>
                            </Grid>

                            {error && <Grid item md={12} xs={12} sm={12} className={classes.errorMsg} role="alert">{error}</Grid>}
                            <Grid item md={12} xs={12} sm={12} className={classes.ContainerloginFormBtn} >
                                <button className={classes.loginFormBtn} type="submit" >
                                    Set Password
                                </button>
                            </Grid>
                        </form>
                    </Grid>
                </Grid>
            </Card>
        </React.Fragment>
    )
}

export default NewPassword;
