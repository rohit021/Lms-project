// import React, { useState, useEffect} from 'react';
// import { Grid, DialogTitle, DialogContent, IconButton, makeStyles, Dialog, Typography, Box } from '@material-ui/core';

// import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
// import CloseIcon from '@material-ui/icons/Close';

// const useStyles = makeStyles(theme => ({
//   timeLine: {
//     boxShadow: '1px 3px 5px 3px #d4d0d0',
//     "align-items": "center",
//     padding: "5px 50px"
//   },
//   title: {
//     fontSize: 20,
//     marginBottom: "5px",
//     fontWeight: 'bold',

//   },
//   Link: {
//     color: "#0000FF"
//   },
//   comment: {
//     marginBottom: "5px",
//   },
//   Cell: {
//     display: "flex",
//     margin: "20px auto"
//   },
//   timebox: {
//     margin: "-2% auto",
//     borderLeft: "5px solid #01183d",
//   },
//   dialogPaper: {
//     position: 'absolute',
//     width: "33%",
//     left: "55%",
//     top: "-5%",
//     maxHeight: '101%',
//   },
// }))

// const LeadModal = (props) => {
//   const classes = useStyles();
//     const [modalListData, setModalListData] = useState([]);

//   useEffect(() => {
//     fetchModalData();
//   }, []);

//   const fetchModalData = async() => {
//     let response = {};
//     // try{
//     //   setLoadingData(true);
//     //   if(props.type == "project"){
//     //     response = await connectAPI('getSalesDashboardProjectActivity',null,{'projectId': props.projectId});
//     //   }
//     //   else{
//     //     response = await connectAPI('getSalesDashboardWorkstreamActivityLog',null,{'workstreamId': props.workstreamId});
//     //   }
//     //   setModalListData(response.activities);
//     // }catch(err) {
//     //   console.log(err);
//     // }
//     // setLoadingData(false);
//   }
  
//   return (
//     <React.Fragment>
//       <Dialog classes={{ paper : classes.dialogPaper}} open={props.openModal} onClose={props.closeModal} disableBackdropClick fullWidth maxWidth="md" >
//         <DialogTitle>
//           <IconButton style={{ backgroundColor: "#36c5f0", float: "right" }} onClick={props.closeModal} >
//             <CloseIcon />
//           </IconButton>
//         </DialogTitle>
//            <DialogContent>
//             <Grid className={classes.timebox}>
//               {modalListData.map((data, index) => (
//                 <Box key={index} className={classes.Cell}>
//                   <FiberManualRecordIcon style={{ color: "#36c5f0", marginLeft: "-13px" }} />
//                   <Grid item className={classes.CellBlock} md={10} xs={12} sm={10}>
//                     <Typography className={classes.title}>
//                       {
//                         data.activityType === 'legendupdate' ?
//                         data.description + data.new_legend
//                         :
//                         data.description
//                       }
//                     </Typography>
//                     <Typography className={classes.comment}>{(data.hasOwnProperty('followup')) ? (data.followup.comments) : ''}
//                     </Typography>
//                     <Typography >
//                       -{data.time}
//                     </Typography>
//                   </Grid>
//                 </Box>
//               ))}
//             </Grid>

//           </DialogContent>
     
//       </Dialog>

//     </React.Fragment>
//   )
// }


// export default LeadModal;
