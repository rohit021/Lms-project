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
 
const ConfirmDetailsModal = ({FormData, handleBack, handleSubmit}) => {
  const classes = useStyles();
  const { name, phone, email, source, center, category, propertyName, radixDepartment, doctor, organization, remark, location, priority, expectedAmount, date } = FormData;
  return (
    <React.Fragment>
        <Divider/>
        <Typography variant="h6" gutterBottom align="center">
            Confirm Lead Data
        </Typography>
        <Divider/>
        <Typography variant="h6" gutterBottom >
            User Information
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
                    primary='Phone'
                    secondary={phone}
                    className={classes.textCenter}
                />
            </Grid>
            <Grid item md={6} xs={6} sm={6}>
                <ListItemText
                    primary='Email'
                    secondary={email}
                    className={classes.textCenter}
                />
            </Grid>
            <Grid item md={6} xs={6} sm={6}>
                <ListItemText
                    primary='Source'
                    secondary={source}
                    className={classes.textCenter}
                />
            </Grid>
        </Grid>
        <Divider/>
        <Typography variant="h6" gutterBottom >
            Organization Information
        </Typography>
        {organization==="radix"?
            <Grid container spacing={2}>
                <Grid item md={4} xs={4} sm={4}>
                    <ListItemText
                        primary='Dept'
                        secondary={radixDepartment}
                        className={classes.textCenter}
                    />
                </Grid>
                <Grid item md={4} xs={4} sm={4}>
                    <ListItemText
                        primary='Doctor'
                        secondary={doctor}
                        className={classes.textCenter}
                    />
                </Grid>
                <Grid item md={4} xs={4} sm={4}>
                    <ListItemText
                        primary='Location'
                        secondary={location}
                        className={classes.textCenter}
                    />
                </Grid>
            </Grid>
            :""
        }
        {organization==="anardana"?
            <Grid container spacing={2}>
                <Grid item md={6} xs={4} sm={4}>
                    <ListItemText
                        primary='Center'
                        secondary={center}
                        className={classes.textCenter}
                    />
                </Grid>
                <Grid item md={4} xs={4} sm={4}>
                    <ListItemText
                        primary='Location'
                        secondary={location}
                        className={classes.textCenter}
                    />
                </Grid>
            </Grid>
            :""
        }
        {organization==="relp"?
            <Grid container spacing={2}>
                <Grid item md={4} xs={4} sm={4}>
                    <ListItemText
                        primary='Property Name'
                        secondary={propertyName}
                        className={classes.textCenter}
                    />
                </Grid>
                <Grid item md={4} xs={4} sm={4}>
                    <ListItemText
                        primary='Remark'
                        style={{ wordWrap: 'break-word' }}
                        secondary={remark}
                        className={classes.textCenter}
                    />
                </Grid>
                <Grid item md={4} xs={4} sm={4}>
                    <ListItemText
                        primary='Location'
                        secondary={location}
                        className={classes.textCenter}
                    />
                </Grid>
            </Grid>
            :""
        }        
        {organization==="woodapple"?
            <Grid container spacing={2}>
                <Grid item md={6} xs={4} sm={4}>
                    <ListItemText
                        primary='Category'
                        secondary={category}
                        className={classes.textCenter}
                    />
                </Grid>
                <Grid item md={4} xs={4} sm={4}>
                    <ListItemText
                        primary='Location'
                        secondary={location}
                        className={classes.textCenter}
                    />
                </Grid>
            </Grid>
            :""
        }
        
        <Divider/>
        <Typography variant="h6" gutterBottom >
            Lead Information
        </Typography>
        <Grid container spacing={2}>
            <Grid item md={4} xs={4} sm={4}>
                <ListItemText
                    primary='Status'
                    secondary={priority}
                    className={classes.textCenter}
                />
            </Grid>
            <Grid item md={4} xs={4} sm={4}>
                <ListItemText
                    primary='Amount'
                    secondary={expectedAmount}
                    className={classes.textCenter}
                />
            </Grid>
            <Grid item md={4} xs={4} sm={4}>
                <ListItemText
                    primary='Date'
                    secondary={moment(date).format("YYYY-MM-DD")}
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
                Save Lead
            </Button>                
            </Grid>
        </Grid>
    </React.Fragment>
  );
};

export default ConfirmDetailsModal;
