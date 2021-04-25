import React, { useEffect, useState } from 'react';
import { Grid, FormControl, MenuItem, Button, ButtonGroup,Typography, TextField, makeStyles} from '@material-ui/core';
import {DepartmentOptions,RadixSource,AnardanaSource,WoodappleSource,RelpSource, CategoryOptions, AnardanaOutlets, PriorityOptions, DateFilterOptions} from "../../helpers/utils";
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
  const [buttonColor, setButtonColor] = useState("");
  const [disabledStatus, setDisabledStatus] = useState(false);
  const [filterData, setFilterData] = useState(filterValue);
  const formattedTodayDate = moment().format("YYYY-MM-DD");
  let SourceOptions
  switch(filterData.organization){
    case 'radix':
      SourceOptions=RadixSource;
          break;
    case 'anardana':
      SourceOptions=AnardanaSource;
          break;
   case 'woodapple':
      SourceOptions=WoodappleSource;
          break;
   case 'relp':
      SourceOptions=RelpSource;
          break; 
    default:
  }
  

  // console.log(filterData);
  const handleChange = (prop) => (event) => {
    const key = event.target.name;
    setFilterData({ ...filterData, [key]: event.target.value });
  }

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
    <Widget header="Search Filters"label="Search Leads" filterData handleChange={handleChange} >
      <Grid container spacing={1} className={classes.gridContainer}>
        { filterData.organization==="radix" ? 
        <Grid item md={2} xs={6} sm={3}>
          <FormControl className={classes.selectStyle}>
            <TextField
              size="small"
              select
              label="Department"
              name="radixDepartment"
              value={filterData.radixDepartment}
              onChange={handleChange()}>
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {DepartmentOptions.map((option, index) => <MenuItem key={index} value={option.value}>{option.text}</MenuItem>)}
            </TextField>
          </FormControl>
        </Grid>
        :""}
         { filterData.organization==="anardana" ? 
        <Grid item md={2} xs={6} sm={3}>
          <FormControl className={classes.selectStyle}>
            <TextField
              size="small"
              select
              label="Center"
              name="center"
              value={filterData.center}
              onChange={handleChange()}>
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {AnardanaOutlets.map((option, index) => <MenuItem key={index} value={option.value}>{option.text}</MenuItem>)}
            </TextField>
          </FormControl>
        </Grid>
        :""}
          { filterData.organization==="woodapple" ? 
        <Grid item md={2} xs={6} sm={3}>
          <FormControl className={classes.selectStyle}>
            <TextField
              size="small"
              select
              label="Category"
              name="category"
              value={filterData.category}
              onChange={handleChange()}>
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {CategoryOptions.map((option, index) => <MenuItem key={index} value={option.value}>{option.text}</MenuItem>)}
            </TextField>
          </FormControl>
        </Grid>
        :""}
        <Grid item md={2} xs={6} sm={3}>
          <FormControl className={classes.selectStyle}>
            <TextField
              size="small"
              select
              label="Source"
              name="source"
              value={filterData.source}
              onChange={handleChange()}>
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {SourceOptions.map((option, index) => <MenuItem key={index} value={option.value}>{option.text}</MenuItem>)}
            </TextField>
          </FormControl>
        </Grid>
        <Grid item md={1} xs={6} sm={4}>
          <FormControl className={classes.selectStyle}>
            <TextField
              size="small"
              select
              label="Status"
              name="status"
              value={filterData.status}
              onChange={handleChange()}>
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {PriorityOptions.map((option, index) => <MenuItem key={index} value={option.value}>{option.text}</MenuItem>)}
            </TextField>
          </FormControl>
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