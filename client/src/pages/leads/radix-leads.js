import React, {useState, useEffect } from "react";
import { Grid, CircularProgress } from "@material-ui/core";
import RadixLeadTable from "../../components/leads/radix-lead-table";
import RadixFilter from "../../components/leads/radix-lead-filter";
import AuthService from "../../authServices/apicalls";
import AddButton from '../../components/addbutton/addbutton'
import RadixModal from '../../components/modals/radix-modal'
import NotFound from "../../components/widget/notfound"
// import ListTopBar from '../../components/layout/listTopBar'
import moment from "moment";

const defaultData = {
  startDate: moment().format("YYYY-MM-01"),
  endDate: moment().format("YYYY-MM-DD"),
  // rating:'',
  // minVal:'',
  source:'',
  orderBy:'date',
  order: 'desc',
  organization: "radix",
};

// const topBarValues = [
// 	{text: 'S.No', md:1, xs:3, sm:1},
// 	{text: 'Name', md:2, xs:3, sm:2},
// 	{text: 'Date', md:1, xs:3, sm:2},
// 	{text: 'Email', md:2, xs:3, sm:1},
// 	{text: 'Phone', md:2, xs:2, sm:2},
// 	{text: 'Organization', md:2, xs:3, sm:2},
// 	{text: 'Source', md:1, xs:3, sm:2},
//   {text: 'Actions', md:1, xs:3, sm:2},    
// ]
  
const RadixLeads = () => {
  const [filterValue, setFilterValue] = useState(defaultData);
  const [loading, setLoading] = useState(false);
  const [leadData, setleadData] = useState(null);
  const [openmodal, setOpenModal] = useState(false);
  const handleChange = () => {
    if (openmodal) {
      setOpenModal(false);
    } else {
      setOpenModal(true);
    }
  };

  function updateData(filters) {
    setFilterValue(filters);
  }
  
  useEffect(() => {
    setLoading(true);
    AuthService.getAllLeads(filterValue).then(
      (data) => {
        setleadData(data.leads);
      },
      (error) => {
        console.log(error);
      }
    );
    setLoading(false);
  }, [filterValue]);

  return (
    <Grid container spacing={4}>
      <Grid item md={12} xs={12} sm={12}>
        <RadixFilter filterValue={filterValue} updateData={updateData} />
        <AddButton handleChange={handleChange}> Add data </AddButton>          
        {openmodal ? <RadixModal status="add" openModal={openmodal} organization="radix" closeModal={handleChange} /> : ''}
        {
          !loading && leadData &&
            <RadixLeadTable filterValue={filterValue} tableData={leadData} updateData={updateData}/>
        }
        {loading && (
          <CircularProgress color="primary" size={30} thickness={4} />
        )}
        {!loading && !leadData && <NotFound/> }
      </Grid>
    </Grid>
  )
}

export default RadixLeads;
