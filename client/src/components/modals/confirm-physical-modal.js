import React from "react";
import { Grid, ListItemText, Typography, Divider } from '@material-ui/core/';
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
 
const ConfirmPhysicalModal = ({FormData, handleBack, handleSubmit}) => {
  const classes = useStyles();
  const { name, phone, email, date, starFood, starClean, starPlace, starService, starMusic, isNegative} = FormData;
  return (
    <React.Fragment>
        <Divider/>
        <Typography variant="h6" gutterBottom align="center">
            Confirm Review Data
        </Typography>
        <Divider/>
        <Typography variant="h6" gutterBottom >
            Physical Review Data
        </Typography>
        <Grid container spacing={2}>
            <Grid item md={3} xs={3} sm={3}>
                <ListItemText
                    primary='Name'
                    secondary={name}
                    className={classes.textCenter}
                />
            </Grid>
            <Grid item md={3} xs={3} sm={3}>
                <ListItemText
                    primary='Phone'
                    secondary={phone}
                    className={classes.textCenter}
                />
            </Grid>
            <Grid item md={3} xs={3} sm={3}>
                <ListItemText
                    primary='Email'
                    secondary={email}
                    className={classes.textCenter}
                />
            </Grid>
            {/* <Grid item md={3} xs={3} sm={3}>
                <ListItemText
                    primary='center'
                    secondary={center}
                    className={classes.textCenter}
                />
            </Grid> */}
            <Grid item md={3} xs={3} sm={3}>
                <ListItemText
                    primary='Date'
                    secondary={moment(date).format("YYYY-MM-DD")}
                    className={classes.textCenter}
                />
            </Grid>
            <Grid item md={6} xs={6} sm={6}>
                <ListItemText
                    primary='Food'
                    secondary={starFood}
                    className={classes.textCenter}
                />
            </Grid>
            <Grid item md={6} xs={6} sm={6}>
                <ListItemText
                    primary='Clean'
                    secondary={starClean}
                    className={classes.textCenter}
                />
            </Grid>
            <Grid item md={6} xs={6} sm={6}>
                <ListItemText
                    primary='Place'
                    secondary={starPlace}
                    className={classes.textCenter}
                />
            </Grid>
            <Grid item md={6} xs={6} sm={6}>
                <ListItemText
                    primary='Service'
                    secondary={starService}
                    className={classes.textCenter}
                />
            </Grid>
            <Grid item md={6} xs={6} sm={6}>
                <ListItemText
                    primary='Music'
                    secondary={starMusic}
                    className={classes.textCenter}
                />
            </Grid>
            <Grid item md={6} xs={6} sm={6}>
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
