import React from "react";
import {Formik, Field, Form} from 'formik';
import * as yup from 'yup';
import { Grid, Button, Typography, TextField, FormControl, MenuItem, makeStyles } from "@material-ui/core";
import {PlatfromOptions} from "../../helpers/utils";
import {Alert, Rating} from '@material-ui/lab'
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import AuthService from "../../authServices/apicalls";
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
      review: yup
      .string()
      .required("This field is required"),
      rating: yup
      .number()
      .required("This field is required"),
      platform: yup
      .string()
      .required("This field is required"),
 })
  
const ReviewModal = ({ReviewData, setReviewData,handleSubmit, handleNext}) => {
  const classes = useStyles();
//  console.log(leadData)

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom align="center">
      Review Information
      </Typography>
      <Formik
      // enableReinitialize
        initialValues={ReviewData}
        onSubmit={values=>{
        setReviewData(values);
          console.log("inside review model", ReviewData)
          console.log(values.isNegative)
          handleNext();
          // console.log(ReviewData)
        
        }
        
      }
        validationSchema={ValidationSchema}
        >
          {({errors, touched, values, handleChange})=>(
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
                <Grid item md={6} xs={6} sm={6}>
                                <Typography variant="h6" component="h5" align="center" >
                                    Ratings *
                                </Typography>
                              <Rating 
                              type="number"
                                    style={{textAlign:"center"}}
                                    name="rating"
                                    // value={value}
                                  onChange={handleChange}
                                  value={values.rating}
                                />
                </Grid>
                <Grid item md={6} xs={6} sm={6}>
                <FormControl component="fieldset"  value={values.isNegative} className={classes.selectStyle} onChange={handleChange} label="isNegative">
                   <Typography align="center">
                        IsNegative?
                  
                    <Typography  style={
                       {
                        justifyContent: "space-around",
                        width: "80%",
                        display: "flex",
                        alignItems: "center"
                    }}  >
                    <Field type="radio" name="isNegative" value="true" />
                    True
                    {/* </Typography>
                    <Typography> */}
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
                    helperText={errors.platform && touched.platform ? errors.platform : ""}
                   
                    >
                    {PlatfromOptions.map((option, index) => <MenuItem key={index} value={option.value}>{option.text}</MenuItem>)}   
                  </TextField>
                </FormControl>
                </Grid>                
                <Button
                  type='submit'
                  variant='contained'
                  color='primary'
                  className={classes.Button}
                  // onClick={handleSubmit}
                >
                  Submit
                </Button>
              </Grid>
            </Form>
          )}
        </Formik>
    </React.Fragment>
  );
};

export default ReviewModal;
