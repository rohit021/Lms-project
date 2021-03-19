import React, { useEffect, useState } from "react";
import { Grid, Button, CircularProgress, Avatar } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import AuthService from "../../authServices/apicalls";
import leadFilter from "../../components/leads/lead-filter";
import leadTable from "../../components/leads/leadtable";
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
  const [formData, setFormData] = useState(false);
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
      (response) => {
        setFormData(response.forms);
      },
      (error) => {
        console.log(error);
      }
    );
    setLoading(false);
  };
  return (
    <React.Fragment>
      <Grid item md={12} xs={12} sm={12}>
        <leadFilter filterValue={filterValue} updateData={updateData} />
        <Button
          variant="contained"
          color="primary"
          style={{ margin: "0 50px" }}
          onClick={handleChange}
        >
          Add Data
        </Button>
        {/* {openmodal? <FormModal  openModal={openmodal} closeModal = {handleChange} />:''}        */}
        {!loading && formData && <leadTable tableData={formData} />}
        {loading && (
          <CircularProgress color="primary" size={30} thickness={4} />
        )}

        {!loading && !formData && (
          <Avatar
            src="https://cdn.dribbble.com/users/1449854/screenshots/4136663/no_data_found.png"
            alt="no data found"
            style={{ width: "40%", height: "30%", margin: "auto" }}
          />
        )}
      </Grid>
    </React.Fragment>
  );
};

export default LeadsHome;
