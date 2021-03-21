import React from "react";
import { Grid, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({

}));

const TopBar = props => {
  const classes = useStyles();
  return (
    <Grid container spacing ={1} className={"tableHeader"}>
            {
              props.data.map((value, index) => (
                <Grid key={index} item md={value.md} xs={value.xs} sm={value.sm} >
                  <Typography >{value.text}</Typography>
                </Grid>
              ))
            }
      </Grid>
      
  );
};

export default TopBar;
