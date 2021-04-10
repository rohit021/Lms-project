import React from "react";
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { Grid, Button, Typography, TextField, FormControl, MenuItem, makeStyles } from "@material-ui/core";
import { SourceOptions } from "../../helpers/utils";
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
  name: yup
    .string()
    .required("This field is required"),
  email: yup
    .string()
    .required("This field is required"),
  phone: yup
    .string()
    .typeError('Entered value should be a valid number')
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(10, 'Must be exactly 10 digits')
    .max(10, 'Must be exactly 10 digits')
    .required('This field is required'),
  source: yup
    .string()
    .required("This field is required"),
})

const UserDetailsModal = ({ FormData, setFormData, handleNext }) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom align="center">
        User Information
      </Typography>
      <Formik
        initialValues={FormData}
        onSubmit={values => {
          setFormData(values);
          handleNext();
        }}
        validationSchema={ValidationSchema}
      >
        {({ errors, touched, values, handleChange }) => (
          <Form className={classes.form}>
            <Grid container spacing={2}>
              <Grid item md={12} xs={12} sm={12}>
                <TextField
                  variant="outlined"
                  id="name"
                  label="User Name *"
                  name="name"
                  onChange={handleChange}
                  value={values.name}
                  error={errors.name && touched.name}
                  helperText={errors.name && touched.name ? errors.name : ""}
                  fullWidth
                />
              </Grid>
              <Grid item md={12} xs={12} sm={12}>
                <TextField
                  variant="outlined"
                  id="phone"
                  label="Phone Number *"
                  name="phone"
                  type="number"
                  onChange={handleChange}
                  value={values.phone}
                  error={errors.phone && touched.phone}
                  helperText={errors.phone && touched.phone ? errors.phone : ""}
                  fullWidth
                />
              </Grid>
              <Grid item md={12} xs={12} sm={12}>
                <TextField
                  variant="outlined"
                  id="email"
                  label="Email Address *"
                  name="email"
                  onChange={handleChange}
                  value={values.email}
                  error={errors.email && touched.email}
                  helperText={errors.email && touched.email ? errors.email : ""}
                  fullWidth
                />
              </Grid>
              <Grid item md={12} xs={12} sm={12}>
                <FormControl className={classes.selectStyle}>
                  <TextField
                    size="small"
                    select
                    label="Source *"
                    name="source"
                    value={values.source}
                    error={errors.source && touched.source}
                    helperText={errors.source && touched.source ? errors.source : ""}
                    onChange={handleChange}>
                    {SourceOptions.map((option, index) => <MenuItem key={index} value={option.value}>{option.text}</MenuItem>)}
                  </TextField>
                </FormControl>
              </Grid>
              <Button
                type='submit'
                variant='contained'
                color='primary'
                className={classes.Button}
              >
                Continue
                </Button>
            </Grid>
          </Form>
        )}
      </Formik>
    </React.Fragment>
  );
};

export default UserDetailsModal;
