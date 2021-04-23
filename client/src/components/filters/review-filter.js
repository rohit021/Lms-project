import React, { useEffect, useState } from 'react';
import { Grid, FormControl, Slider, FormControlLabel, Checkbox, MenuItem, Button, ButtonGroup,Typography, TextField, makeStyles} from '@material-ui/core';
import {PlatformOptions, AnardanaOutlets, DateFilterOptions} from "../../helpers/utils";
import Widget from '../widget/widget';
import moment from 'moment';
const useStyles = makeStyles((theme) => ({
  gridContainer: {
    padding: 5,
    justifyContent: "space-around",
    "align-items": "center",
  },
  selectStyle: {
    minWidth: '100%'
  },
}));

const CommonFilters = ({filterValue, updateData}) => {
  const classes = useStyles();
  const [value, setValue] = React.useState([1,5]);
  const [buttonColor, setButtonColor] = useState("");
  const [disabledStatus, setDisabledStatus] = useState(false);
  const [filterData, setFilterData] = useState(filterValue);
  const formattedTodayDate = moment().format("YYYY-MM-DD");

  // console.log(filterData);
  const handleChange = (prop) => (event) => {
    const key = event.target.name;
    console.log(key);
    setFilterData({ ...filterData, [key]: event.target.value });
  }

  const handleCheckedChange = (event) => {
    const key = event.target.name;
    setFilterData({ ...filterData, [key]: event.target.checked });
  };
  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
    setFilterData({ ...filterData, minValue:newValue[0], maxValue:newValue[1] });
  };  
  
  const handleStartDate = (date) => {
    // console.log(date);
    setFilterData({ ...filterData, startDate: date });// [key]: event.target.
  }
  const handleEndDate = (date) => {
    setFilterData({ ...filterData, endDate: date });// [key]: event.target.
  }
    useEffect(() => {
      updateData(filterData);
    }, [filterData]);

  const changedateWeek =()=>{
      var weekstartDate = moment().clone().startOf('isoWeek').format('YYYY-MM-DD');;
      setFilterData({...filterData, startDate:weekstartDate, endDate:formattedTodayDate});   
  }

  const changedateMonth =()=>{
    var monthstartDate = moment().format('YYYY-MM-01');
    setFilterData({...filterData, startDate:monthstartDate, endDate:formattedTodayDate});   
  }

  const changedateYear =()=>{
    var yearstartDate = moment().format('YYYY-01-01');
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
      default:
    }
  }

  return (
    <Widget header="Search Filters">
      <Grid container spacing={1} className={classes.gridContainer}>
        { filterData.organization==="anardana" ? 
        <Grid item md={1} xs={6} sm={3}>
          <FormControl className={classes.selectStyle}>
            <TextField
              size="small"
              select
              label="Center"
              name="center"
              value={filterData.center}
              onChange={handleChange()}>
              {AnardanaOutlets.map((option, index) => <MenuItem key={index} value={option.value}>{option.text}</MenuItem>)}
            </TextField>
          </FormControl>
        </Grid>
        :""}
        <Grid item md={1} xs={6} sm={3}>
          <FormControl className={classes.selectStyle}>
            <TextField
              size="small"
              select
              label="Platform"
              name="platform"
              value={filterData.platform}
              onChange={handleChange()}>
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {PlatformOptions.map((option, index) => <MenuItem key={index} value={option.value}>{option.text}</MenuItem>)}
            </TextField>
          </FormControl>
        </Grid>
        <Grid item md={1} xs={1} sm={1}>
          <FormControlLabel
            control={
              <Checkbox
                checked={filterData.isNegative}
                onChange={handleCheckedChange}
                name="isNegative"
                color="primary"
              />
            }
            label="Is Negative"
          />
        </Grid>
        <Grid item md={1} xs={6} sm={4}>
            <Typography id="discrete-slider" >
                Ratings
            </Typography>
            <Slider 
                min={1}
                max={5}
                value={value}
                onChange={handleSliderChange}
                step={1}
                valueLabelDisplay="auto"
            />
        </Grid>
        <Grid item md={3} xs={12} sm={4}>
          <ButtonGroup color="primary" aria-label="outlined primary button group">
            {
              DateFilterOptions.map((option) => (
              <Button key={option.value} style={ (buttonColor === option.value) ? {backgroundColor: '#01579b', color: '#fff'} : {textTransform: 'capitalize'}} onClick={() => onSortFilterChange(option.value)}  
              disabled={disabledStatus === option.value}>
                  {option.text}
              </Button>
              ))
            }
          </ButtonGroup>                            
        </Grid>
        <Grid item md={2} xs={6} sm={2}>
          <Typography>
            Start Date
            </Typography>
          <TextField
            id="createdStartDate"
            type="date"
            onChange={(e) => handleStartDate(e.target.value)}
            value={filterData.startDate}
            className={classes.datePick}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{inputProps: {max: formattedTodayDate} }}
            format="DD/MM/YYYY"
          />
        </Grid>
        <Grid item md={2} xs={6} sm={2}>
          <Typography>
            End Date
            </Typography>
          <TextField
            id="createdStartDate"
            type="date"
            onChange={(e) => handleEndDate(e.target.value)}
            value={filterData.endDate}
            className={classes.datePick}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{inputProps: {max: formattedTodayDate} }}
            format="DD/MM/YYYY"
          />
        </Grid>
      </Grid>
    </Widget>    
  )
}

export default CommonFilters;