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
        flexDirection: "column"
    },
    title: {
        textAlign: "center",
        fontSize: "16px",
        fontWeight: "700"
    },
    SvgIcon: {
        textAlign:"center",
        fontSize:"3.4rem"
    },

    dataValue: {
        justifyContent: "center",
        alignItems: "center",
        display: "flex"
    },
    ButtonStyle: {
        backgroundColor:theme.palette.primary.blue,
        fontWeight: "bold",  
        width: "100%",
        display: "flex",
        justifyContent:"center",
        color: "#fff",
        "&:hover": {
            backgroundColor:"#273d64",
        },
    },
}));

const SimpleCard = ({ CardsData }) => {
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
                                <Grid item md={3} xs={2} sm={2} className={classes.SvgIcon}>
                                    {data.icon}
                                </Grid>
                                <Grid item md={9} xs={9} sm={9} className={classes.dataValue}>
                                    <Typography variant="h3" component="h2">
                                        {data.value? data.value: 0}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                            <Link to={data.link}>
                                <CardActions className={classes.ButtonStyle} >
                                    <Typography variant="h6" component="h5">
                                        {data.footer}
                                    </Typography>
                                </CardActions>
                            </Link>
                    </Card>
                ))
            }
      </Grid>
    );
}

export default SimpleCard;
