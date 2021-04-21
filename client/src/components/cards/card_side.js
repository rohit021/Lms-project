import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Grid, CardActions, CardContent, Button, Typography } from '@material-ui/core';

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
                                <Grid item md={6} xs={6} sm={6} >
                                    <Typography variant="h3" component="h2">
                                        {data.leadsvalue}
                                    </Typography>
                                    <Typography>
                                       Leads
                                    </Typography>
                                </Grid>
                                <Grid item md={6} xs={6} sm={6}>
                                    <Typography variant="h3" component="h2">
                                        {data.reviewvalue}
                                    </Typography>
                                    <Typography>
                                       Reviews
                                    </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                        <CardActions className={classes.ButtonStyle} >
                            <Button size="small" className={classes.ButtonStyle} >Show More</Button>
                        </CardActions>
                    </Card>
                ))
            }
      </Grid>
    );
}

export default SimpleCard;
