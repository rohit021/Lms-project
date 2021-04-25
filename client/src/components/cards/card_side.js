import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Grid, CardActions, CardContent, Typography } from '@material-ui/core';
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) =>({
    root: {
        margin: "20px auto",
        display: "flex",
        minWidth: "25%",
        width: "300px",
        borderRadius:"10px",
        textAlign:"center",
        flexDirection: "column"
    },
    title: {
        textAlign: "center",
        fontWeight: "700",
        color:theme.palette.primary.blue,
        fontSize:"20px"
    },
    TextStyle:{
        color: "#fff",
        fontWeight: "bold",  
        "&:nth-child(odd)": {
            borderRight:"2px solid black",
        },
        "&:hover": {
            backgroundColor:theme.palette.primary.dark,
            opacity:"0.8"
        },
    },
    ButtonStyle: {
        backgroundColor:theme.palette.primary.blue,
        fontWeight: "bold",  
        width: "100%",
    },
}));

const CardWithSide = ({ CardsData }) => {
    const classes = useStyles();
    
    return (
        <Grid container spacing={1}>
            {
                CardsData.map((data, index) => (
                    <Card key ={index} className={classes.root} variant="outlined">
                        <CardContent>                            
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                {data.title}
                            </Typography>
                            <Grid container spacing={1}>
                                <Grid item md={6} xs={6} sm={6} >
                                    <Typography variant="h3" component="h2">
                                        {data.leadsvalue ? data.leadsvalue: 0}
                                    </Typography>
                                    <Typography>
                                    Leads
                                    </Typography>
                                </Grid>
                                <Grid item md={6} xs={6} sm={6}>
                                    <Typography variant="h3" component="h2">
                                        {data.reviewvalue ? data.reviewvalue: 0}
                                    </Typography>
                                    <Typography>
                                    Reviews
                                    </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                        <CardActions className={classes.ButtonStyle} >
                            <Grid container spacing={2} >
                                <Grid item md={6} xs={6} sm={6} className={classes.TextStyle} >
                                    <Link to={data.leadlink}>
                                        <Typography variant="h5" component="h2" style={{color:"#fff"}}>
                                            Show More
                                        </Typography>
                                    </Link>
                                </Grid>
                                <Grid item md={6} xs={6} sm={6} className={classes.TextStyle}>
                                    <Link to={data.reviewlink}>
                                        <Typography variant="h5" component="h2" style={{color:"#fff"}}>
                                            Show More
                                        </Typography>
                                    </Link>
                                </Grid>    
                            </Grid>                        
                        </CardActions>
                    </Card>
                ))
            }
      </Grid>
    );
}

export default CardWithSide;
