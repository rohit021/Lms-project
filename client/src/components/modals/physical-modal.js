import React from "react";
import { Formik, Field, Form } from "formik";
import * as yup from "yup";
import { Rating } from "@material-ui/lab";
import {Grid, Button, Typography, TextField, FormControl, MenuItem, makeStyles } from "@material-ui/core";
import { SourceOptions } from "../../helpers/utils";
const useStyles = makeStyles((theme) => ({
  Button: {
    margin: "10px auto",
    background: "#01579b",
    color: "#fff",
  },
  AlignText: {
    textAlign: "center",
  },
  selectStyle: {
    minWidth: "100%",
  },
}));

const ValidationSchema = yup.object().shape({
  name: yup.string().required("This field is required"),
  email: yup.string().required("This field is required"),
  phone: yup
    .string()
    .typeError('Entered value should be a valid number')
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(10, 'Must be exactly 10 digits')
    .max(10, 'Must be exactly 10 digits')
    .required('This field is required'),
});

const PhysicalModal = ({ FormData, setFormData, handleNext }) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom align="center">
        User Information
      </Typography>
      <Formik
        initialValues={FormData}
        onSubmit={(values) => {
          console.log(values);
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
              <Grid item md={6} xs={6} sm={6}>
                <FormControl
                  component="fieldset"
                  value={values.isNegative}
                  className={classes.selectStyle}
                  onChange={handleChange}
                  label="isNegative"                  
                >
                 <Typography variant="h6" component="h5" align="center">
                    IsNegative ?
                    <Typography style={{justifyContent: "space-around",width:"60%",margin:" 0 auto",display: "flex",alignItems: "center"}}>
                      <Field type="radio" name="isNegative" value="true" />
                        True
                      <Field type="radio" name="isNegative" value="false" />
                        False
                    </Typography>
                  </Typography>
                </FormControl>
              </Grid>

                  <Grid item md={6} xs={6} sm={6} className={classes.AlignText}>
                <Typography variant="h6" component="h5" align="center">
                  Food *
                </Typography>
                <Rating
                  type="number"
                  style={{ textAlign: "center", "text-align": "center" }}
                  name="starFood"
                  onChange={handleChange}
                  value={values.starFood}
                />
              </Grid>
                  <Grid item md={6} xs={6} sm={6} className={classes.AlignText}>
                <Typography variant="h6" component="h5" align="center">
                  Clean *
                </Typography>
                <Rating
                  type="number"
                  name="starClean"
                  onChange={handleChange}
                  value={values.starClean}
                />
              </Grid>
                  <Grid item md={6} xs={6} sm={6} className={classes.AlignText}>
                <Typography variant="h6" component="h5" align="center">
                  Place *
                </Typography>
                <Rating
                  type="number"
                  name="starPlace"
                  onChange={handleChange}
                  value={values.starPlace}
                />
              </Grid>
                  <Grid item md={6} xs={6} sm={6} className={classes.AlignText}>
                <Typography variant="h6" component="h5" align="center">
                  Service *
                </Typography>
                <Rating
                  type="number"
                  name="starService"
                  onChange={handleChange}
                  value={values.starService}
                />
              </Grid>
                  <Grid item md={6} xs={6} sm={6} className={classes.AlignText}>
                <Typography variant="h6" component="h5" align="center">
                  Music *
                </Typography>
                <Rating
                  type="number"
                  name="starMusic"
                  onChange={handleChange}
                  value={values.starMusic}
                />
              </Grid>
              <Button
                type="submit"
                variant="contained"
                color="primary"
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

export default PhysicalModal;
