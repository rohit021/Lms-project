import React, {useState, useEffect } from "react";
import { Grid, CircularProgress } from "@material-ui/core";
import CommonTable from "../../components/table/table";
import RadixFilter from "../../components/leads/radix-lead-filter";
import AuthService from "../../authServices/apicalls";
import AddButton from '../../components/addbutton/addbutton'
import RadixModal from '../../components/modals/radix-modal'
import NotFound from "../../components/widget/notfound";
import {CommonLeadHeadCells} from '../../helpers/utils';
import moment from "moment";

const defaultData = {
  startDate: moment().format("YYYY-MM-01"),
  endDate: moment().format("YYYY-MM-DD"),
  // rating:'',
  dept:'',
  source:'',
  orderBy:'date',
  order: 'desc',
  organization: "anardana",
};

const AnardanaLeads = () => {
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
        {/* {openmodal ? <RadixModal status="add" openModal={openmodal} organization="radix" closeModal={handleChange} /> : ''} */}
        {
          !loading && leadData &&
            <CommonTable filterValue={filterValue} LeadHeadCells={CommonLeadHeadCells} tableData={leadData} updateData={updateData}/>
        }
        {loading && (
          <CircularProgress color="primary" size={30} thickness={4} />
        )}
        {!loading && !leadData && <NotFound/> }
      </Grid>
    </Grid>
  )
}

export default AnardanaLeads;
