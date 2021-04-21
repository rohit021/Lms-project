import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Grid, CardActions, CardContent, Button, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) =>({
    root: {
        margin: "20px auto",
        display: "flex",
        width: "25%",
        borderRadius:"10px",
        flexDirection: "column"
    },
    title: {
        textAlign: "center",
        fontSize: "16px",
    },
    SvgIcon: {
        fontSize:"3.4rem"
    },

    dataValue: {
        justifyContent: "space-between",
        alignItems: "center",
        display: "flex"
    },
    ButtonStyle: {
        backgroundColor:theme.palette.primary.blue,
        fontWeight: "bold",  
        display: "flex",
        justifyContent:"center",
        color: "#fff"
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
                                <Grid item md={3} xs={6} sm={6} className={classes.SvgIcon}>
                                    {data.icon}
                                </Grid>
                                <Grid item md={6} xs={6} sm={6} className={classes.dataValue}>
                                    <Typography variant="h3" component="h2">
                                        {data.value}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                        <CardActions className={classes.ButtonStyle} >
                            <Button size="small" className={classes.ButtonStyle} >{data.footer}</Button>
                        </CardActions>
                    </Card>
                ))
            }
      </Grid>
    );
}

export default SimpleCard;
