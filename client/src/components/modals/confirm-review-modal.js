import React from "react";
import { Grid, ListItemText, Typography, Divider } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

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
 
const ConfirmReviewModal = ({FormData, handleBack, handleSubmit}) => {
  const classes = useStyles();
  const { name, date, review, center, rating,isNegative, platform} = FormData;
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
                    secondary={name}
                    className={classes.textCenter}
                />
            </Grid>
            <Grid item md={6} xs={6} sm={6}>
                <ListItemText
                    primary='Rating'
                    secondary={rating}
                    className={classes.textCenter}
                />
            </Grid>
            <Grid item md={12} xs={12} sm={12}>
                <ListItemText
                    primary='Review'
                    secondary={review}
                    className={classes.textCenter}
                />
            </Grid>
            <Grid item md={3} xs={3} sm={3}>
                <ListItemText
                    primary='Center'
                    secondary={center}
                    className={classes.textCenter}
                />
            </Grid>
            <Grid item md={3} xs={3} sm={3}>
                <ListItemText
                    primary='Platform'
                    secondary={platform}
                    className={classes.textCenter}
                />
            </Grid>
            <Grid item md={3} xs={3} sm={3}>
                <ListItemText
                    primary='IsNegative'
                    secondary={isNegative}
                    className={classes.textCenter}
                />
            </Grid>
            <Grid item md={3} xs={3} sm={3}>
                <ListItemText
                    primary='Date'
                    secondary={date}
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

export default ConfirmReviewModal;
