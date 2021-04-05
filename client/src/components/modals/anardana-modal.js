import React,{useState} from "react";
import {Formik, Form} from 'formik';
import * as yup from 'yup';
import { Grid, Button, Typography, TextField, FormControl, MenuItem, makeStyles } from "@material-ui/core";
import {CenterOptions, LocationOptions } from "../../helpers/utils";
const useStyles = makeStyles((theme) => ({
  Button: {
    margin: "10px auto",
    background: "#01579b",
    color: "#fff",
  },
  selectStyle: {
    minWidth: '100%'
  },
}));

const ValidationSchema = yup.object().shape({
  center: yup
      .string()
      .required("This field is required"),
  location: yup
      .string()
      .required("This field is required"),
})
  
const AnardanaDetailsModal = ({FormData, setFormData, handleBack, handleNext}) => {
  const classes = useStyles();
  const [direction, setDirection] = useState('back');

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom align="center">
      Organization Information
      </Typography>
      <Formik
        initialValues={FormData}
       onSubmit={values => {
           console.log("inside");
          setFormData(values);
          direction === 'back' ? handleBack() : handleNext();
        }}
        validationSchema={ValidationSchema}
        >
          {({errors, touched, values, handleChange})=>(
            <Form className={classes.form}>
              <Grid container spacing={2}>
                <Grid item md={12} xs={12} sm={12}>
                <FormControl className={classes.selectStyle}>
                    <TextField
                        size="small"
                        select
                        label="Center *"
                        name="center"
                        value={values.center}
                        error={errors.center && touched.center}
                        helperText={errors.center && touched.center ? errors.center : ""}
                        onChange={handleChange}>
                        {CenterOptions.map((option, index) => <MenuItem key={index} value={option.value}>{option.text}</MenuItem>)}   
                    </TextField>
                </FormControl>                
                </Grid>
                <Grid item md={12} xs={12} sm={12}>
                <FormControl className={classes.selectStyle}>
                    <TextField
                        size="small"
                        select
                        label="Location *"
                        name="location"
                        value={values.location}
                        error={errors.location && touched.location}
                        helperText={errors.location && touched.location ? errors.location : ""}
                        onChange={handleChange}>
                        {LocationOptions.map((option, index) => <MenuItem key={index} value={option.value}>{option.text}</MenuItem>)}   
                    </TextField>
                </FormControl>                
                </Grid>
                <Grid item md={6} xs={6} sm={6}>
                <Button
                    type='submit'
                    variant='contained'
                    color='secondary'
                    fullWidth
                    className={classes.Button}
                    onClick={() => setDirection('back')}
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
                    onClick={() => setDirection('forward')}
                    >
                    Continue
                </Button>                
              </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
    </React.Fragment>
  );
};

export default AnardanaDetailsModal;
