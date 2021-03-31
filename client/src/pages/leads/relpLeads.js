// import React, {useState, useEffect } from "react";
// import { Grid, Avatar, CircularProgress,Button } from "@material-ui/core";
// import LeadTable from "../../components/leads/leadtable";
// import LeadFilter from "../../components/leads/lead-filter";
// import AuthService from "../../authServices/apicalls";
// import LeadModal from '../../components/modals/lead-modal'
// // import ListTopBar from '../../components/layout/listTopBar'
// import moment from "moment";

// const defaultData = {
//   startDate: moment().format("YYYY-MM-01"),
//   endDate: moment().format("YYYY-MM-DD"),
//   // rating:'',
//   // minVal:'',
//   source:'',
//   orderBy:'date',
//   order: 'desc',
//   organization: "relp",
// };

// // const topBarValues = [
// // 	{text: 'S.No', md:1, xs:3, sm:1},
// // 	{text: 'Name', md:2, xs:3, sm:2},
// // 	{text: 'Date', md:1, xs:3, sm:2},
// // 	{text: 'Email', md:2, xs:3, sm:1},
// // 	{text: 'Phone', md:2, xs:2, sm:2},
// // 	{text: 'Organization', md:2, xs:3, sm:2},
// // 	{text: 'Source', md:1, xs:3, sm:2},
// //   {text: 'Actions', md:1, xs:3, sm:2},    
// // ]
  
// const Leads = () => {
//   const [filterValue, setFilterValue] = useState(defaultData);
//   const [loading, setLoading] = useState(false);
//   const [leadData, setleadData] = useState(null);
//   const [openmodal, setOpenModal] = useState(false);
//   const handleChange = () => {
//     if (openmodal) {
//       setOpenModal(false);
//     } else {
//       setOpenModal(true);
//     }
//   };

//   function updateData(filters) {
//     setFilterValue(filters);
//   }
  
//   useEffect(() => {
//     fetchData();
//   }, [filterValue]);
        
//   const fetchData = async () => {
//       setLoading(true);
//       AuthService.getAllLeads(filterValue).then(
//         (data) => {
//           setleadData(data.leads);
//         },
//         (error) => {
//           console.log(error);
//         }
//       );
//       setLoading(false);
//     };

//   return (
//     <Grid container spacing={4}>
//       <Grid item md={12} xs={12} sm={12}>
//         <LeadFilter filterValue={filterValue} updateData={updateData} defaultData={defaultData} />
//         <Button
//           variant="contained"
//           color="primary"
//           style={{ float:"right", margin:"5px auto",background:"#01579b", color:"#fff" }}
//           onClick={handleChange}
//         >
//         Add data
//         </Button>
//         {openmodal ? <LeadModal openModal={openmodal} organization="relp" closeModal={handleChange} /> : ''}
//         {
//           !loading && leadData &&
//             <LeadTable filterValue={filterValue} tableData={leadData} updateData={updateData} fetchData={fetchData} />
//         }
//         {loading && (
//           <CircularProgress color="primary" size={30} thickness={4} />
//         )}
//         {!loading && !leadData && (
//           <Avatar
//           src="https://cdn.dribbble.com/users/1449854/screenshots/4136663/no_data_found.png"
//           alt="no data found"
//           style={{ width: "40%", height: "80%", margin: "auto" }}
//           />
//         )}
//       </Grid>
//     </Grid>
//   )
// }

// export default Leads;
