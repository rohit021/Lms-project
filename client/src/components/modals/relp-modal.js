import React from "react";
import {Formik, Field, Form} from 'formik';
import * as yup from 'yup';
import { Grid, Button, Typography, TextField, FormControl, MenuItem, makeStyles } from "@material-ui/core";
import {PropertyNameOptions} from "../../helpers/utils";
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
  propertyName: yup
      .string()
      .required("This field is required"),
  // location: yup
  //     .string()
  //     .required("This field is required"),
})
  
const RelpDetailsModal = ({FormData, setFormData, handleBack, handleNext}) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom align="center">
      Organization Information
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
                        label="Property Name *"
                        name="propertyName"
                        value={values.propertyName}
                        error={errors.propertyName && touched.propertyName}
                        helperText={errors.propertyName && touched.propertyName ? errors.propertyName : ""}
                        onChange={handleChange}>
                        {PropertyNameOptions.map((option, index) => <MenuItem key={index} value={option.value}>{option.text}</MenuItem>)}   
                    </TextField>
                </FormControl>                
                </Grid>
                <Grid item md={12} xs={12} sm={12}>
                  <TextField
                    variant="outlined"
                    id="location"
                    label="Location*"
                    name="location"
                    onChange={handleChange}
                    value={values.location}
                    error={errors.location && touched.location}
                    helperText={errors.location && touched.location ? errors.location : ""}
                    fullWidth
                  />
                </Grid>
                <Grid item md={12} xs={12} sm={12}>
                  <TextField
                    variant="outlined"
                    id="remark"
                    label="remark"
                    name="remark"
                    multiline
                    onChange={handleChange}
                    value={values.remark}
                    error={errors.remark && touched.remark}
                    helperText={errors.remark && touched.remark ? errors.remark : ""}
                    fullWidth
                  />
                </Grid>
                <Grid item md={12} xs={12} sm={12}>
                <FormControl
                  className={classes.selectStyle}
                  onChange={handleChange}
                  label="visit"                  
                >
                 <Typography variant="h6" component="h5" align="center">
                   Visit ?
                   <Typography style={{justifyContent: "space-around",width:"40%",margin:" 0 auto",display: "flex",alignItems: "center"}}>
                      <Field type="radio" name="visit" value="true" />
                        Yes
                      <Field type="radio" name="visit" value="false" />
                        No
                    </Typography>
                  </Typography>
                </FormControl>
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

export default RelpDetailsModal;
