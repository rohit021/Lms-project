import React from "react";
import { Formik, Field, Form } from "formik";
import * as yup from "yup";
import {Grid, Button, Typography, TextField, FormControl, MenuItem, makeStyles } from "@material-ui/core";
import { PlatformOptions} from "../../helpers/utils";
import { Rating } from "@material-ui/lab";
const useStyles = makeStyles((theme) => ({
  Button: {
    margin: "10px auto",
    background: "#01579b",
    color: "#fff",
  },
  AlignText:{
    textAlign: "center",
  },
  selectStyle: {
    minWidth: "100%",
  },
}));

const ValidationSchema = yup.object().shape({
  name: yup.string().required("This field is required"),
  review: yup.string().required("This field is required"),
  rating: yup.number().required("This field is required"),
  platform: yup.string().required("This field is required"),
});

const ReviewModal = ({ edit, FormData, setFormData, handleNext }) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom align="center">
        Review Information
      </Typography>
      <Formik
        initialValues={FormData}
        onSubmit={(values) => {
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
                  multiline
                  id="review"
                  label="Review *"
                  name="review"
                  type="string"
                  onChange={handleChange}
                  value={values.review}
                  error={errors.review && touched.review}
                  helperText={errors.review && touched.review ? errors.review : ""}
                  fullWidth
                />
              </Grid>
              {
                edit && <Grid item md={12} xs={12} sm={12}>
                  <TextField
                    variant="outlined"
                    multiline
                    id="reply"
                    label="Reply"
                    name="reply"
                    type="string"
                    onChange={handleChange}
                    value={values.reply}
                    error={errors.reply && touched.reply}
                    helperText={errors.reply && touched.reply ? errors.reply : ""}
                    fullWidth
                  />
                </Grid>
              } 
              <Grid item md={6} xs={6} sm={6} className={classes.AlignText}>
                <Typography variant="h6" component="h5" align="center">
                  Ratings *
                </Typography>
                <Rating
                  size="large"                 
                  name="rating"
                  value={values.rating}
                  error={errors.rating && touched.rating}
                  helperText={errors.rating && touched.rating ? errors.rating : ""}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item md={6} xs={6} sm={6}>
                <FormControl
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
              <Grid item md={12} xs={12} sm={12}>
                <FormControl className={classes.selectStyle}>
                  <TextField
                    size="small"
                    select
                    label="Platform *"
                    name="platform"
                    value={values.platform}
                    onChange={handleChange}
                    error={errors.platform && touched.platform}
                    helperText={
                      errors.platform && touched.platform ? errors.platform : ""
                    }
                  >
                    {PlatformOptions.map((option, index) => (<MenuItem key={index} value={option.value}>{option.text}</MenuItem>))}
                  </TextField>
                </FormControl>
              </Grid>              
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.Button}                
              >
                Next
              </Button>
            </Grid>
          </Form>
        )}
      </Formik>
    </React.Fragment>
  );
};

export default ReviewModal;
