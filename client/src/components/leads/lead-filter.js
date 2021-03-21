import React, { useEffect, useState } from 'react';
// import { Grid, Typography, ButtonGroup, Button, makeStyles, TextField, Paper } from '@material-ui/core';
import { DatePicker, MuiPickersUtilsProvider, } from '@material-ui/pickers';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import MomentUtils from '@date-io/moment';
import { Grid, FormControl, MenuItem, Button, ButtonGroup,Typography, TextField, makeStyles, Paper } from '@material-ui/core';
import {OrganizationOptions, SourceOptions, DateFilterOptions} from "../../helpers/utils";
import moment from 'moment';
const useStyles = makeStyles((theme) => ({
  gridContainer: {
    margin: "0 auto",
    // width: "70%",
    padding: 5,
    border: "1px solid",
    marginBottom: 18,
    justifyContent: "space-around",
    boxShadow: '1px 3px 5px 3px #d4d0d0',
    "align-items": "center",
  },
  dialogPaper: {
    position: 'absolute',
    width: "30%",
  },
  ratingStyle: {
    textAlign: "center"
  },

  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  selectStyle: {
    minWidth: '100%'
  },
}));
const Filter = (props) => {
  const classes = useStyles();
  const [buttonColor, setButtonColor] = useState("");
  const [disabledStatus, setDisabledStatus] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filterData, setFilterData] = useState(props.filterValue);
  const formattedTodayDate = moment().format("YYYY-MM-DD");

  // console.log(filterData);
  const handleChange = (prop) => (event) => {
    const key = event.target.name;
    setFilterData({ ...filterData, [key]: event.target.value });
  }

  const handleStartDate = (date) => {
  console.log(date);
  setFilterData({ ...filterData, startDate: date });// [key]: event.target.
}
const handleEndDate = (date) => {
  setFilterData({ ...filterData, endDate: date });// [key]: event.target.
}
  useEffect(() => {
    props.updateData(filterData);
  }, [filterData]);

const changedateWeek =()=>{
    var weekstartDate = moment().clone().startOf('isoWeek').format('YYYY-MM-DD');;
    console.log(weekstartDate);
    setStartDate(weekstartDate);
    setEndDate(formattedTodayDate);   
    setFilterData({...filterData, startDate:weekstartDate, endDate:formattedTodayDate});   
}
const changedateMonth =()=>{
  var monthstartDate = moment().format('YYYY-MM-01');
  setStartDate(monthstartDate);
  setEndDate(formattedTodayDate);   
  setFilterData({...filterData, startDate:monthstartDate, endDate:formattedTodayDate});   
}

const changedateYear =()=>{
  var yearstartDate = moment().format('YYYY-01-01');
  setStartDate(yearstartDate);
  setEndDate(formattedTodayDate);   
  setFilterData({...filterData, startDate:yearstartDate, endDate:formattedTodayDate});   
}

  const onSortFilterChange = (value) => {
    switch(value){
        case 'week':
            setButtonColor("week");
            setDisabledStatus("week");
            changedateWeek();
            break;
        case 'month':
            setButtonColor("month")
            setDisabledStatus("month");
            changedateMonth();
            break;
        case 'year':
            setButtonColor("year");
            setDisabledStatus("year");
            changedateYear();
            break;         
    }
}
  return (
    <React.Fragment>
           <Grid container spacing={1} className={classes.gridContainer}>
           <Grid item md={3} xs={6} sm={3}>
          <FormControl className={classes.selectStyle}>
            <TextField
              size="small"
              select
              label="Organization"
              name="organization"
              value={filterData.organization}
              onChange={handleChange()}>
              {OrganizationOptions.map((option, index) => <MenuItem key={index} value={option.value}>{option.text}</MenuItem>)}
            </TextField>
          </FormControl>
        </Grid>
        <Grid item md={3} xs={12} sm={4}>
                    <ButtonGroup color="primary" aria-label="outlined primary button group">
                        {
                           DateFilterOptions.map((option) => (
                            <Button key={option.value} style={ (buttonColor == option.value) ? {backgroundColor: '#36c5f0', color: '#fff'} : {textTransform: 'capitalize'}} onClick={() => onSortFilterChange(option.value)}  
                            disabled={disabledStatus == option.value}>
                                {option.text}
                            </Button>
                            ))
                        }
                    </ButtonGroup>                            
                </Grid>
                <Grid item md={2} xs={6} sm={3}>
          <Typography>
            Start Date
            </Typography>
          <TextField
            id="createdStartDate"
            type="date"
            onChange={(e) => handleStartDate(e.target.value)}
            defaultValue={filterData.startDate}
            value={startDate}
            className={classes.datePick}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{inputProps: {max: formattedTodayDate} }}
            format="DD/MM/YYYY"
          />
        </Grid>

        <Grid item md={2} xs={6} sm={3}>
          <Typography>
            End Date
            </Typography>
          <TextField
            id="createdStartDate"
            type="date"
            onChange={(e) => handleEndDate(e.target.value)}
            value={endDate}
            defaultValue={filterData.endDate}
            className={classes.datePick}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{inputProps: {max: formattedTodayDate} }}
            format="DD/MM/YYYY"
          />
        </Grid>
                {/* <Grid item md={3} xs={12} sm={6} className={classes.dateBox}>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                        <DatePicker  className={classes.datePick}
                            name="createdStartDate"
                            InputProps={{
                                disableUnderline: true,
                            }}
                            textFieldStyle={{width: '50%'}} 
                            value={startDate}
                            placeholder="DD/MM/YYYY"
                            onChange={(date) => handleStartDateChange(date)}
                            maxDate={new Date()}
                            format="DD/MM/YYYY"
                        />
                    </MuiPickersUtilsProvider>
                    <ArrowRightAltIcon/>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                        <DatePicker className={classes.datePick}
                            name="createdEndDate"
                            InputProps={{
                                disableUnderline: true,
                            }}
                            value={endDate}
                            placeholder="DD/MM/YYYY"
                            onChange={(date) => handleEndDateChange(date)}
                            maxDate={new Date()}
                            format="DD/MM/YYYY"
                        />
                    </MuiPickersUtilsProvider>
                </Grid>   */}
        {/* <Grid item md={3} xs={12} sm={6} className={classes.dateBox}>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                        <DatePicker  className={classes.datePick}
                            name="createdStartDate"
                            InputProps={{
                                disableUnderline: true,
                            }}
                            textFieldStyle={{width: '50%'}} 
                            value={startDate}
                            placeholder="DD/MM/YYYY"
                            onChange={(date) => handleFeedStartDate(date)}
                            maxDate={new Date()}
                            format="DD/MM/YYYY"
                        />
                    </MuiPickersUtilsProvider>
                    <ArrowRightAltIcon/>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                        <DatePicker className={classes.datePick}
                            name="createdEndDate"
                            InputProps={{
                                disableUnderline: true,
                            }}
                            value={endDate}
                            placeholder="DD/MM/YYYY"
                            onChange={(date) => handleFeedEndDate(date)}
                            maxDate={new Date()}
                            format="DD/MM/YYYY"
                        />
                    </MuiPickersUtilsProvider>
                </Grid>
        <Grid item md={2} xs={5} sm={3}>
          <Typography>
            Start Date
            </Typography>
          <TextField
            id="createdStartDate"
            type="date"
            onChange={(e) => handleStartDate(e.target.value)}
            defaultValue={filterData.startDate}
            className={classes.datePick}
            InputLabelProps={{
              shrink: true,
            }}
            format="DD/MM/YYYY"
          />
        </Grid>

        <Grid item md={2} xs={6} sm={3}>
          <Typography>
            End Date
            </Typography>
          <TextField
            id="createdStartDate"
            type="date"
            onChange={(e) => handleEndDate(e.target.value)}
            defaultValue={filterData.endDate}
            className={classes.datePick}
            InputLabelProps={{
              shrink: true,
            }}
            format="DD/MM/YYYY"
          />
        </Grid>

        <Grid item md={2} xs={6} sm={3}>
          <FormControl className={classes.selectStyle}>
            <TextField
              size="small"
              select
              label="Organization"
              name="organization"
              value={filterData.organization}
              onChange={handleChange()}>
              {OrganizationOptions.map((option, index) => <MenuItem key={index} value={option.value}>{option.text}</MenuItem>)}
            </TextField>
          </FormControl>
        </Grid>
        <Grid item md={2} xs={6} sm={3}>
          <FormControl className={classes.selectStyle}>
            <TextField
              size="small"
              select
              label="Source"
              name="source"
              value={filterData.source}
              onChange={handleChange()}>
              {SourceOptions.map((option, index) => <MenuItem key={index} value={option.value}>{option.text}</MenuItem>)}
            </TextField>
          </FormControl>
        </Grid> */}
        
      </Grid>
    </React.Fragment>
  )
}

export default Filter;