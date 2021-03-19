import React, { useEffect, useState } from "react";
import { Grid, Button, CircularProgress, Avatar } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import AdminSidebar from '../../components/layout/adminSidebar'
import AuthService from "../../authServices/apicalls";
import LeadFilter from "../../components/leads/lead-filter";
import LeadTable from "../../components/leads/leadtable";
// import FormModal from '../modals/form-modal'
import moment from "moment";
const defaultData = {
  startDate: moment().format("YYYY-MM-01"),
  endDate: moment().format("YYYY-MM-DD"),
  // rating:'',
  // minVal:'',
  // maxVal:'',
  organization: "",
};
const LeadsHome = () => {
  const [filterValue, setFilterValue] = useState(defaultData);
  const [loading, setLoading] = useState(false);
  const [leadData, setleadData] = useState(false);
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
    fetchData();
  }, [filterValue]);

  const fetchData = async () => {
    // console.log(filterValue);
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
  };
  return (
    <React.Fragment><AdminSidebar page={"Leads"} />
      <Grid item md={12} xs={12} sm={12}>
        
        {/* <leadFilter filterValue={filterValue} updateData={updateData} /> */}
        <Button
          variant="contained"
          color="primary"
          // style={{ margin: "0 50px" }}
          onClick={handleChange}
        >
          Add Data
        </Button>
        {/* {openmodal? <FormModal  openModal={openmodal} closeModal = {handleChange} />:''}        */}
        {!loading && leadData && <LeadTable tableData={leadData} />}
        {loading && (
          <CircularProgress color="primary" size={30} thickness={4} />
        )}

        {/* {!loading && !leadData && (
          <Avatar
            src="https://cdn.dribbble.com/users/1449854/screenshots/4136663/no_data_found.png"
            alt="no data found"
            style={{ width: "40%", height: "30%", margin: "auto" }}
          />
        )} */}
      </Grid>
    </React.Fragment>
  );
};

export default LeadsHome;
