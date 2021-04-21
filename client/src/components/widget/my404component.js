import React from 'react'
import {Link, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    mainbox: {
        backgroundColor:theme.palette.primary.blue,
        margin: "auto",
        height: "600px",
        width:" 600px",
        position: "relative"
    },
    err: {
        color: "#ffffff",
        fontFamily:"Nunito Sans, sans-serif",
        fontSize: "11rem",
        position:"absolute",
        left: "20%",
        top: "8%"
    },
    far: {
        position: "absolute",
        fontSize: "8.5rem",
        left: "42%",
        top: "15%",
        color: "#ffffff"
    },
    err2: {
      color: "#ffffff",
      fontFamily: "Nunito Sans, sans-serif",
      fontSize: "11rem",
      position:"absolute",
      left: "68%",
      top:"8%"
    },
    msg: {
        textAlign: "center",
        fontFamily: "Nunito Sans, sans-serif",
        fontSize: "1.6rem",
        position:"absolute",
        left: "16%",
        top: "45%",
        width: "75%",
    }
  }));

const My404Component = () => {
    const classes = useStyles();
    return (
        <div className={classes.mainbox}>
    <div className={classes.err}>4</div>
    <div className={classes.far}>
    <i class="fa fa-question-circle-o fa-spin" aria-hidden="true"></i>
    </div>   
    <div className={classes.err2}>4</div>
    <div className={classes.msg}>Maybe this page moved? Got deleted? Is hiding out in quarantine? Never existed in the first place?<p style={{color:"#fff", fontSize:"1.2rem"}}>Let's go <Link href="/" style={{color:"#333", fontSize:"1.2rem"}} >home</Link> and try from there.</p></div>
      </div>
    )
}

export default My404Component;
