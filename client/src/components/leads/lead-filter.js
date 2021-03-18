// import React, { useEffect, useState } from 'react';
// import { Grid, FormControl, MenuItem, Button, ButtonGroup,Typography, TextField, makeStyles, Paper } from '@material-ui/core';
// import {OrganizationOptions, SourceOptions, DateFilterOptions} from '../../utils/list'

// const useStyles = makeStyles((theme) => ({
//   gridContainer: {
//     margin: "0 auto",
//     width: "70%",
//     padding: 5,
//     border: "1px solid",
//     marginBottom: 18,
//     justifyContent: "space-around",
//     boxShadow: '1px 3px 5px 3px #d4d0d0',
//     "align-items": "center",
//   },
//   dialogPaper: {
//     position: 'absolute',
//     width: "30%",
//   },
//   ratingStyle: {
//     textAlign: "center"
//   },

//   form: {
//     width: '100%', // Fix IE 11 issue.
//     marginTop: theme.spacing(3),
//   },
//   submit: {
//     margin: theme.spacing(3, 0, 2),
//   },
//   selectStyle: {
//     minWidth: '100%'
//   },
// }));
// const Filter = (props) => {
//   const classes = useStyles();
//   const [buttonColor, setButtonColor] = useState("");
//   const [disabledStatus, setDisabledStatus] = useState(false);
//   const [filterData, setFilterData] = useState(props.filterValue);
// // console.log(filterData);
//   const handleChange = (prop) => (event) => {
//     const key = event.target.name;
//     setFilterData({ ...filterData, [key]: event.target.value });
//   }
  
//   const handleStartDate = (date) => {
//     setFilterData({ ...filterData, startDate: date });// [key]: event.target.
//   }
//   const handleEndDate = (date) => {
//     setFilterData({ ...filterData, endDate: date });// [key]: event.target.
//   }
//   useEffect(() => {
//     props.updateData(filterData);
//   }, [filterData]);
//   const changeMonthdate =()=>{
//     var lastMonthstartDate = moment().subtract(1,'months').format('YYYY-MM-01');
//     var lastMonthendDate = moment().subtract(1,'months').endOf('month').format('YYYY-MM-DD');
//     setStartDate(lastMonthstartDate);
//     setEndDate(lastMonthendDate);        
//     let filterMTD={
//         startDate:lastMonthstartDate,
//         endDate:lastMonthendDate
//     }   
//     props.updateData(filterMTD);

// }
// const changedateToday =()=>{
//     setStartDate(formattedTodayDate);
//     setEndDate(formattedTodayDate);   
//     setFilterData({...filterData, startDate:formattedTodayDate, endDate:formattedTodayDate});

// }
// const changedateYesterday =()=>{
//     var yesterdayDate = moment().subtract(1,'days').format('YYYY-MM-DD');
//     console.log(yesterdayDate);
//     setStartDate(yesterdayDate);
//     setEndDate(formattedTodayDate);   
//     setFilterData({...filterData, startDate:yesterdayDate, endDate:formattedTodayDate});   
// }
//   const onSortFilterChange = (value) => {
//     switch(value){
//         case 'week':
//             setButtonColor("week");
//             setDisabledStatus("week");
//             changedateWeek();
//             break;
//         case 'month':
//             setButtonColor("month")
//             setDisabledStatus("month");
//             changedateMonth();
//             break;
//         case 'year':
//             setButtonColor("year");
//             setDisabledStatus("year");
//             changedateYear();
//             break;
//         default: ''            
//     }
// }
//   return (
//     <React.Fragment>
//       <Grid container spacing={1} md={10} xs={12} sm={12} className={classes.gridContainer}>
//         <Grid item md={3} xs={12} sm={4}>
//           <ButtonGroup color="primary" aria-label="outlined primary button group">
//               {
//                 DateFilterOptions.map((option) => (
//                     <Button key={option.value} style={ (buttonColor == option.value) ? {backgroundColor: '#36c5f0', color: '#fff'} : {textTransform: 'capitalize'}} onClick={() => onSortFilterChange(option.value)}  
//                     disabled={disabledStatus == option.value}>
//                         {option.text}
//                     </Button>
//                 ))
//               }
//           </ButtonGroup>                            
//         </Grid>        
//         <Grid item md={3} xs={12} sm={6} className={classes.dateBox}>
//                     <MuiPickersUtilsProvider utils={MomentUtils}>
//                         <DatePicker  className={classes.datePick}
//                             name="createdStartDate"
//                             InputProps={{
//                                 disableUnderline: true,
//                             }}
//                             textFieldStyle={{width: '50%'}} 
//                             value={startDate}
//                             placeholder="DD/MM/YYYY"
//                             onChange={(date) => handleFeedStartDate(date)}
//                             maxDate={new Date()}
//                             format="DD/MM/YYYY"
//                         />
//                     </MuiPickersUtilsProvider>
//                     <ArrowRightAltIcon/>
//                     <MuiPickersUtilsProvider utils={MomentUtils}>
//                         <DatePicker className={classes.datePick}
//                             name="createdEndDate"
//                             InputProps={{
//                                 disableUnderline: true,
//                             }}
//                             value={endDate}
//                             placeholder="DD/MM/YYYY"
//                             onChange={(date) => handleFeedEndDate(date)}
//                             maxDate={new Date()}
//                             format="DD/MM/YYYY"
//                         />
//                     </MuiPickersUtilsProvider>
//                 </Grid>
//         <Grid item md={2} xs={5} sm={3}>
//           <Typography>
//             Start Date
//             </Typography>
//           <TextField
//             id="createdStartDate"
//             type="date"
//             onChange={(e) => handleStartDate(e.target.value)}
//             defaultValue={filterData.startDate}
//             className={classes.datePick}
//             InputLabelProps={{
//               shrink: true,
//             }}
//             format="DD/MM/YYYY"
//           />
//         </Grid>

//         <Grid item md={2} xs={6} sm={3}>
//           <Typography>
//             End Date
//             </Typography>
//           <TextField
//             id="createdStartDate"
//             type="date"
//             onChange={(e) => handleEndDate(e.target.value)}
//             defaultValue={filterData.endDate}
//             className={classes.datePick}
//             InputLabelProps={{
//               shrink: true,
//             }}
//             format="DD/MM/YYYY"
//           />
//         </Grid>

//         <Grid item md={2} xs={6} sm={3}>
//           <FormControl className={classes.selectStyle}>
//             <TextField
//               size="small"
//               select
//               label="Organization"
//               name="organization"
//               value={filterData.organization}
//               onChange={handleChange()}>
//               {OrganizationOptions.map((option, index) => <MenuItem key={index} value={option.value}>{option.text}</MenuItem>)}
//             </TextField>
//           </FormControl>
//         </Grid>
//         <Grid item md={2} xs={6} sm={3}>
//           <FormControl className={classes.selectStyle}>
//             <TextField
//               size="small"
//               select
//               label="Source"
//               name="source"
//               value={filterData.source}
//               onChange={handleChange()}>
//               {SourceOptions.map((option, index) => <MenuItem key={index} value={option.value}>{option.text}</MenuItem>)}
//             </TextField>
//           </FormControl>
//         </Grid>
        
//       </Grid>
//     </React.Fragment>
//   )
// }

// export default Filter;