import React,{useState} from "react";
import { Grid, ListItem, ListItemText, Typography, Divider } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
    textCenter: {
        textAlign: 'center'
    },
    Button: {
        margin: "10px auto",
        background: "#01579b",
        color: "#fff",
      },
}));
 
const ConfirmPhysicalModal = ({ReviewData, handleBack, handleSubmit}) => {
  const classes = useStyles();
  const { name,date, review, rating,isNegative, platform} = ReviewData;
  return (
    <React.Fragment>
        <Divider/>
        <Typography variant="h6" gutterBottom align="center">
            Confirm Review Data
        </Typography>
        <Divider/>
        <Typography variant="h6" gutterBottom >
            Review Data
        </Typography>
        <Grid container spacing={2}>
            <Grid item md={6} xs={6} sm={6}>
                <ListItemText
                    primary='Name'
                    secondary={ReviewData.name}
                    className={classes.textCenter}
                />
            </Grid>
            <Grid item md={6} xs={6} sm={6}>
                <ListItemText
                    primary='Review'
                    secondary={review}
                    className={classes.textCenter}
                />
            </Grid>
            <Grid item md={4} xs={4} sm={4}>
                <ListItemText
                    primary='Rating'
                    secondary={rating}
                    className={classes.textCenter}
                />
            </Grid>
            <Grid item md={4} xs={4} sm={4}>
                <ListItemText
                    primary='Platform'
                    secondary={platform}
                    className={classes.textCenter}
                />
            </Grid>
            <Grid item md={4} xs={4} sm={4}>
                <ListItemText
                    primary='IsNegative'
                    secondary={isNegative}
                    className={classes.textCenter}
                />
            </Grid>
        </Grid>
        
        <Grid container spacing={2}>
            <Grid item md={6} xs={6} sm={6}>
            <Button
                type='submit'
                variant='contained'
                fullWidth
                className={classes.Button}
                onClick={handleBack}
                >
                Back
            </Button>
            </Grid>
            <Grid item md={6} xs={6} sm={6}>
            <Button
                type='submit'
                variant='contained'
                color='primary'
                fullWidth
                className={classes.Button}
                onClick={handleSubmit}
                
                >
                Save Review
            </Button>                
            </Grid>
        </Grid>
    </React.Fragment>
  );
};

export default ConfirmPhysicalModal;
