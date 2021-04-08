import React,{useState} from "react";
import {Formik, Form} from 'formik';
import * as yup from 'yup';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Grid, Button, Typography, TextField, FormControl, MenuItem, makeStyles } from "@material-ui/core";
import {DepartmentOptions, DoctorOptions } from "../../helpers/utils";
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
  radixDepartment: yup
      .string()
      .required("This field is required"),
  doctor: yup
      .string()
      .required("This field is required"),
  // location: yup
  //     .string()
  //     .required("This field is required"),
})
  
 

const RadixDetailsModal = ({FormData, setFormData, handleBack, handleNext}) => {
  const classes = useStyles();
  const[newDoctorOptions, setNewDoctorOptions]=useState(DoctorOptions);
  const [value, setValue] = React.useState(null);
  const [open, toggleOpen] = React.useState(false);

  const handleClose = () => {
    setDialogValue({
      title: '',
      year: '',
    });

    toggleOpen(false);
  };

  const [dialogValue, setDialogValue] = React.useState({
    title: '',
    year: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setValue({
      title: dialogValue.title,
      year: parseInt(dialogValue.year, 10),
    });

    handleClose();
  };

  
  const DepartmentChange=(event)=>{
    const newdepartment=event.target.value;
    // console.log(newdepartment)
    const DoctorList=DoctorOptions.filter(newData=>newdepartment===newData.dept);
    setNewDoctorOptions(DoctorList);
    // console.log(DoctorList)
  }

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
                      label="Department *"
                      name="radixDepartment"
                      value={values.radixDepartment}
                      error={errors.radixDepartment && touched.radixDepartment}
                      helperText={errors.radixDepartment && touched.radixDepartment ? errors.radixDepartment : ""}
                      // onChange={handleChange}
                      onChange={(event)=>{
                        DepartmentChange(event);
                        handleChange(event);
                        }
                      }
                    >
                      {DepartmentOptions.map((option, index) => <MenuItem key={index} value={option.value}>{option.text}</MenuItem>)}   
                    </TextField>
                  </FormControl>                
                </Grid>
                <Grid item md={12} xs={12} sm={12}>
                <FormControl className={classes.selectStyle}>
              <Autocomplete
                      freeSolo
                      label="doctor"
                      disableClearable
                      // value={values.doctor}
                      
                      options={newDoctorOptions.map((option) => option.text)}
                      renderInput={(params) => (
                        <TextField
                        
                          {...params}
                          label="Search Doctors"
                          margin="normal"
                          name="doctor"
                          variant="outlined"
                          value={params.doctor}
                          onChange={(event)=>{
                            handleChange(event);
                            }
                          }
                            error={errors.doctor && touched.doctor}
                            helperText={errors.doctor && touched.doctor ? errors.doctor : ""}
                          InputProps={{ ...params.InputProps, type: 'search' }}
                         
                        />

          
              )}
              />
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
                    id="otherspecify"
                    label="Other Specify"
                    name="otherspecify"
                    onChange={handleChange}
                    value={values.otherspecify}
                    error={errors.otherspecify && touched.otherspecify}
                    helperText={errors.otherspecify && touched.otherspecify ? errors.otherspecify : ""}
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

export default RadixDetailsModal;
