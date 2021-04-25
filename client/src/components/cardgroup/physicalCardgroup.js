import React from 'react';
import { Grid, Paper, Typography, makeStyles} from '@material-ui/core';
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

const PhysicalCardgroup = ({data}) => {
//   console.log(data)
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
           <Grid container spacing={1} className={classes.gridContainer}>
                <Grid item md={3} xs={4} sm={4}>
                    <Typography>
                        Music NPS
                    </Typography>
                    <Typography style={{color:"#01579b", fontSize:"28px",fontWeight:"bold"}}>
                       {data.Music.nps}
                    </Typography>
                </Grid>
                <Grid item md={2} xs={4} sm={4}>
                    <Typography>
                        Clean NPS
                    </Typography>
                    <Typography style={{color:"#01579b", fontSize:"28px",fontWeight:"bold"}}>
                       {data.Clean.nps}
                    </Typography>
                </Grid>
                <Grid item md={2} xs={4} sm={4}>
                    <Typography>
                        Food NPS
                    </Typography>
                    <Typography style={{color:"#01579b", fontSize:"28px",fontWeight:"bold"}}>
                        {data.Food.nps}
                    </Typography>
                </Grid>
                <Grid item md={2} xs={4} sm={4}>
                    <Typography>
                        Service NPS
                    </Typography>
                    <Typography style={{color:"#01579b", fontSize:"28px",fontWeight:"bold"}}>
                        {data.Service.nps}
                    </Typography>
                </Grid>
                <Grid item md={3} xs={4} sm={4}>
                    <Typography>
                        Place NPS
                    </Typography>
                    <Typography style={{color:"#01579b", fontSize:"28px",fontWeight:"bold"}}>
                        {data.Place.nps}
                    </Typography>
                </Grid>
            </Grid>   
    </Paper>    
  )
}

export default PhysicalCardgroup;