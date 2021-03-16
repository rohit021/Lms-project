import React, { useEffect, useState } from 'react';
import { Grid, Typography, ButtonGroup, Button, makeStyles, Paper } from '@material-ui/core';
import { DatePicker, MuiPickersUtilsProvider, } from '@material-ui/pickers';
import DropDown from 'components/common/dropDown';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import { salesFeedTypes, salesRevenueDateTypes} from 'utils/Options';

export const filterActivityType = [
    {"key"   : 'job', "text"  : 'Job', "value" : 'job'},
    {"key"   : 'workstream', "text"  : 'Workstream', "value" : 'workstream'}
]

export const filterManager = [
    {
      "key": "509808",
      "text": "Sumit",
      "value": "509808"
    },
    {
      "key": "664018",
      "text": "Khushboo",
      "value": "664018"
    },
    {
      "key": "1186277",
      "text": "Shubham",
      "value": "1186277"
    },
    {
      "key": "1201149",
      "text": "Anil",
      "value": "1201149"
    },
    {
      "key": "1309257",
      "text": "Nancy",
      "value": "1309257"
    },
    {
      "key": "1402655",
      "text": "Paramesh",
      "value": "1402655"
    },
    {
      "key": "1402653",
      "text": "Ranjha",
      "value": "1402653"
    },
    {
      "key": "1402652",
      "text": "Akshay",
      "value": "1402652"
    },
    {
      "key": "1692474",
      "text": "Sumedh",
      "value": "1692474"
    },
    {
      "key": "1876552",
      "text": "Prathamesh",
      "value": "1876552"
    },
    {
      "key": null,
      "text": "All",
      "value": "all"
    }
]

export const filterActivities= [
    {"key"   : 'followup', "text"  : 'Follow Up', "value" : 'followup'},
    {"key"   : 'managerassigned', "text"  : 'Manager Assigned', "value" : 'managerassigned'},
    {"key"   : 'projectviewed', "text"  : 'Project Viewed', "value" : 'projectviewed'},
    {"key"   : 'proposalrecommended', "text"  : 'Proposal Recommended', "value" : 'proposalrecommended'},
    {"key"   : 'freelancerinvited', "text"  : 'Freelancer Invite', "value" : 'freelancerinvited'},
    {"key"   : 'legendupdate', "text"  : 'Legend Update', "value" : 'legendupdate'},
    {"key"   : 'closereasonupdate', "text"  : 'Close Reason Update', "value" : 'closereasonupdate'},
    {"key"   : 'nextFollowup', "text"  : 'Next Followup', "value" : 'nextFollowup'},
    {"key"   : 'all', "text"  : 'All', "value" : 'all'}
]
function getKeyByValue(object, value) {
    for (let i in object){
        if((object[i]['key'])==value){
            return object[i]['text'];
        }
    }
}

const useStyles = makeStyles(theme => ({
    gridContainer: {
        margin: "0 auto",        
        width: "70%",
        padding: 12,
        border: "1px solid",
        marginTop: 8,
        marginBottom: 18,
        justifyContent:"center",
        boxShadow: '1px 3px 5px 3px #d4d0d0',
        "align-items": "center",
    },
    dateBox: {
        border: "1px solid",        
    },
    datePick: {
        margin:"0 5px",
        width:"40%"
    }
}))

const SalesFilter = (props) => {
    const propsFilter = props.filter;
    const [filterData, setFilterData] = useState(props.filterValue);
    const [buttonColor, setButtonColor] = useState("");
    const [disabledStatus, setDisabledStatus] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const formattedTodayDate = moment().format("YYYY-MM-DD");
    
    useEffect(() => {
		props.updateData(filterData)
	}, [filterData]);

    useEffect(() => {
        setStartDate(formattedTodayDate);
        setEndDate(formattedTodayDate); 
       }, []);

    const handleStartDateChange = (date) => {    
        const formattedDate = moment(date._d).format("YYYY-MM-DD");
        let filterHandle={
            startDate:formattedDate,
            endDate:endDate
        }   
        setStartDate(formattedDate);
        props.updateData(filterHandle);        
    }
    const handleFeedStartDate = (date) => {    
        const formattedDate = moment(date._d).format("YYYY-MM-DD");
        let filterHandle={
            startDate:formattedDate,
            endDate:endDate
        }   
        setStartDate(formattedDate);
        setFilterData({...filterData, startDate:formattedDate});// [key]: event.target.
    }
    const handleFeedEndDate = (date) => {    
        const formattedDate = moment(date._d).format("YYYY-MM-DD");
        let filterHandle={
            startDate:formattedDate,
            endDate:endDate
        }   
        setEndDate(formattedDate);
        setFilterData({...filterData, endDate:formattedDate});// [key]: event.target.
    }

    const handleDateChange = (date) => {    
        const formattedDate = moment(date._d).format("YYYY-MM-DD");
        let filterHandle={
            date:formattedDate,            
        }   
        setStartDate(formattedDate);
        props.updateData(filterHandle);        
    }
    const handleEndDateChange = (date) => {
        const formattedDate = moment(date._d).format("YYYY-MM-DD");
        let filterHandle={
            startDate:startDate,
            endDate:formattedDate
        }   
        setEndDate(formattedDate);
        props.updateData(filterHandle);   
    }

    const changedateMTD =()=>{
        const formattedStartDate = moment().format("YYYY-MM-01");
        setStartDate(formattedStartDate);
        setEndDate(formattedTodayDate);
        let filterMTD={
            startDate:formattedStartDate,
            endDate:formattedTodayDate
        }   
        props.updateData(filterMTD);

    }
    const changeMonthdate =()=>{
        var lastMonthstartDate = moment().subtract(1,'months').format('YYYY-MM-01');
        var lastMonthendDate = moment().subtract(1,'months').endOf('month').format('YYYY-MM-DD');
        setStartDate(lastMonthstartDate);
        setEndDate(lastMonthendDate);        
        let filterMTD={
            startDate:lastMonthstartDate,
            endDate:lastMonthendDate
        }   
        props.updateData(filterMTD);

    }
    const changedateToday =()=>{
        setStartDate(formattedTodayDate);
        setEndDate(formattedTodayDate);   
        setFilterData({...filterData, startDate:formattedTodayDate, endDate:formattedTodayDate});

    }
    const changedateYesterday =()=>{
        var yesterdayDate = moment().subtract(1,'days').format('YYYY-MM-DD');
        console.log(yesterdayDate);
        setStartDate(yesterdayDate);
        setEndDate(formattedTodayDate);   
        setFilterData({...filterData, startDate:yesterdayDate, endDate:formattedTodayDate});   
    }
    const onSortFilterChange = (value) => {
        switch(value){
            case 'today':
                setButtonColor("today");
                setDisabledStatus("today");
                changedateToday ();
                break;
            case 'yr':
                setButtonColor("yr")
                setDisabledStatus("yr");
                changedateYesterday();
                break;
            case 'mtd':
                setButtonColor("mtd");
                setDisabledStatus("mtd");
                changedateMTD();
                break;
            case 'last':
                setButtonColor("last");
                setDisabledStatus("last");
                changeMonthdate();
                break;
            default: ''            
        }
    }
    
    const classes = useStyles();
    
    const handleChange = (prop) => (event) => {
        const key = event.target.name;
        setFilterData({...filterData, [key]: event.target.value});
      }
    
    const renderSummaryFilter = (
        <React.Fragment>
            <Grid container spacing={1} className={classes.gridContainer}>
                <Grid item md={3} xs={12} sm={6} className={classes.dateBox}>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                    <DatePicker  className={classes.datePick}
                        name="createdStartDate"
                        InputProps={{
                            disableUnderline: true,
                        }}
                        textFieldStyle={{width: '50%'}} 
                        value={startDate}
                        placeholder="DD/MM/YYYY"
                        onChange={(date) => handleDateChange(date)}
                        maxDate={new Date()}
                        format="DD/MM/YYYY"
                    />
                </MuiPickersUtilsProvider>
                </Grid>                
            </Grid>
        </React.Fragment>
    )
    const renderRevenueFilter = (
        <React.Fragment>
            <Grid container spacing={1} className={classes.gridContainer}>
                <Grid item md={3} xs={12} sm={4}>
                    <ButtonGroup color="primary" aria-label="outlined primary button group">
                        {
                            salesRevenueDateTypes.map((option) => (
                                <Button key={option.value} style={ (buttonColor == option.value) ? {backgroundColor: '#36c5f0', color: '#fff'} : {textTransform: 'capitalize'}} onClick={() => onSortFilterChange(option.value)}  
                                disabled={disabledStatus == option.value}>
                                    {option.text}
                                </Button>
                            ))
                        }
                    </ButtonGroup>                            
                </Grid>
                <Grid item md={3} xs={12} sm={6} className={classes.dateBox}>
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
                </Grid>
            </Grid> 
        </React.Fragment>
    )

    const renderFeedFilter = (
        <React.Fragment>
            <Grid container spacing={1} className={classes.gridContainer}>
                <Grid item md={2} xs={6} sm={6}>
                    <Typography>
                        Activity Type
                    </Typography>
                    <DropDown id="users-filter-status" name={"activityType"} action={handleChange()}  defaultValue={filterData.activityType} options={filterActivityType} />
                </Grid>
                <Grid item md={2} xs={6} sm={6}>
                    <Typography>
                        Manager 
                    </Typography>
                    <DropDown id="users-filter-status" name={"tl_manager_id"} action={handleChange()}  defaultValue={filterData.tl_manager_id} options={filterManager} />
                </Grid>                
                <Grid item md={2} xs={6} sm={6}>
                    <Typography>
                        Activities 
                    </Typography>
                    <DropDown id="users-filter-status" name={"type"} action={handleChange()}  defaultValue={filterData.type} options={filterActivities} />
                </Grid>
                {/* <Grid item md={1} xs={6} sm={6}/> */}
                <Grid item md={3} xs={12} sm={4}>
                    <ButtonGroup color="primary" aria-label="outlined primary button group">
                    {
                        salesFeedTypes.map((option) => (
                            <Button key={option.value} style={ (buttonColor == option.value) ? {backgroundColor: '#36c5f0', color: '#fff'} : {textTransform: 'capitalize'}} onClick={() => onSortFilterChange(option.value)}  disabled={disabledStatus == option.value} >
                                {option.text}
                            </Button>
                        ))
                    }              
                    </ButtonGroup>
                </Grid>
                <Grid item md={3} xs={12} sm={6} className={classes.dateBox}>
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
            </Grid> 
            <Typography align="center" style={{fontWeight:600}}>Activity: {getKeyByValue(filterActivities,filterData.type)}</Typography>
        </React.Fragment>
    )

    const renderSwitch = (filter)=> {
        switch(filter) {
          case 'summary':
            return renderSummaryFilter;
          case 'revenue':
            return renderRevenueFilter;
          case 'feed':
            return renderFeedFilter;
          default:
            return 'foo';
        }
      }

    return (
        renderSwitch(propsFilter)
    )
}

export default SalesFilter;