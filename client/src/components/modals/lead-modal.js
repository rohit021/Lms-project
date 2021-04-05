import React,{useState} from "react";
import {Formik, Form} from 'formik';
import * as yup from 'yup';
import { Grid, Button, Typography, TextField, FormControl, MenuItem, makeStyles } from "@material-ui/core";
import {PriorityOptions } from "../../helpers/utils";
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
    priority: yup
        .string()
        .required("This field is required"),
    // expectedAmount: yup
    //     .number()
    //     .integer()
    //     .positive()
    //     .typeError('Value must be a number')
    //     .min(0,'Min Amount should be 0')
    //     .required('This field is required')
})
  
const LeadDetailsModal = ({FormData, setFormData, handleBack, handleNext}) => {
  const classes = useStyles();
  
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom align="center">
      Lead Information
      </Typography>
      <Formik
        initialValues={FormData}
        onSubmit={values => {
            setFormData(values);
            handleNext();
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
                        label="Priority *"
                        name="priority"
                        value={values.priority}
                        error={errors.priority && touched.priority}
                        helperText={errors.priority && touched.priority ? errors.priority : ""}
                        onChange={handleChange}>
                        {PriorityOptions.map((option, index) => <MenuItem key={index} value={option.value}>{option.text}</MenuItem>)}   
                    </TextField>
                </FormControl>                
                </Grid>
                <Grid item md={12} xs={12} sm={12}>
                  <TextField
                    variant="outlined"
                    id="expectedAmount"
                    label="Expected Amount "
                    name="expectedAmount"
                    type="number"
                    placeholder="Placeholder" 
                    onChange={handleChange}
                    value={values.expectedAmount}
                    error={errors.expectedAmount && touched.expectedAmount}
                    helperText={errors.expectedAmount && touched.expectedAmount ? errors.expectedAmount : ""}
                    fullWidth
                  />
                </Grid>
                <Grid item md={6} xs={6} sm={6}>
                <Button
                    variant='contained'
                    color='secondary'
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

export default LeadDetailsModal;
