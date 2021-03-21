import React from "react";
import { Grid, Typography, makeStyles } from "@material-ui/core";
import { BorderBottom } from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
title : {
  font: "Poppins-Regular",
  fontWeight:800,
  margin:"10px auto",
 
},
tableHeader:{
  borderBottom:"2px solid" 
}
}));

const TopBar = props => {
  const classes = useStyles();
  return (
    <Grid container spacing ={1} className={classes.tableHeader}>
            {
              props.data.map((value, index) => (
                <Grid key={index} item md={value.md} xs={value.xs} sm={value.sm} >
                  <Typography className={classes.title} >{value.text}</Typography>
                </Grid>
              ))
            }
      </Grid>
      
  );
};

export default TopBar;
