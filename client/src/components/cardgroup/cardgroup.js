import React, { useEffect, useState } from 'react';
import { Grid, Paper, Slider, MenuItem, Button, ButtonGroup,Typography, TextField, makeStyles} from '@material-ui/core';
import {PlatfromOptions, CenterOptions, DateFilterOptions} from "../../helpers/utils";
import Widget from '../widget/widget';
import moment from 'moment';
const useStyles = makeStyles((theme) => ({
  gridContainer: {
    textAlign:"center",
    "align-items": "center",
  },
  paper: {
    margin:"10px 0",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    boxShadow: '1px 3px 5px 3px #d4d0d0',
    padding: 15,
    flexGrow: 1,
    overflow: "auto",
  },
}));

const CardGroup = ({data}) => {
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
           <Grid container spacing={1} className={classes.gridContainer}>
                <Grid item md={4} xs={6} sm={6}>
                    <Typography>
                        Positive Review
                    </Typography>
                    <Typography style={{color:"#129412", fontSize:"28px",fontWeight:"bold"}}>
                       {data.posCount}
                    </Typography>
                </Grid>
                <Grid item md={4} xs={6} sm={6}>
                    <Typography>
                        Negative Review
                    </Typography>
                    <Typography style={{color:"red", fontSize:"28px",fontWeight:"bold"}}>
                        {data.negCount}
                    </Typography>
                </Grid>
                <Grid item md={4} xs={6} sm={6}>
                    <Typography>
                        NPS
                    </Typography>
                    <Typography style={{color:"#01579b", fontSize:"28px",fontWeight:"bold"}}>
                        {data.nps>0? data.nps :"0"}
                    </Typography>
                </Grid>
            </Grid>
            
    </Paper>    
  )
}

export default CardGroup;