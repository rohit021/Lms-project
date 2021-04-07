import React, {useState, useEffect } from "react";
import { Grid, Stepper, Step, StepLabel, CircularProgress } from "@material-ui/core";
import CommonTable from "../../components/table/table";
import RadixFilter from "../../components/filters/filter";
import AuthService from "../../authServices/apicalls";
import AddButton from '../../components/addbutton/addbutton'
import Modal from '../../components/modals/modal';
import UserModal from '../../components/modals/user-modal';
import RadixModal from '../../components/modals/radix-modal';
import LeadModal from '../../components/modals/lead-modal';
import ConfirmModal from '../../components/modals/confirm-modal';
import NotFound from "../../components/widget/notfound";
import {Steps, CommonLeadHeadCells} from '../../helpers/utils';
// import ListTopBar from '../../components/layout/listTopBar'
import moment from "moment";
const formattedTodayDate = moment().format("YYYY-MM-DD");

const defaultData = {
  startDate: moment().format("YYYY-MM-01"),
  endDate: moment().format("YYYY-MM-DD"),
  source:'',
  status:'',
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
  const [activeStep, setActiveStep]  = useState(0);
  const [openmodal, setOpenModal] = useState(false);
  const [FormData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    source: "",
    center: "",
    radixDepartment: "",
    doctor: "",
    location: "",
    otherspecify: "",
    priority: "",
    expectedAmount: "",
    organization: "radix",
    date: formattedTodayDate,
  });
  
  const ModalChange = () => {
    if (openmodal) {
      handleReset();
      setOpenModal(false);
    } else {
      setOpenModal(true);
    }
  };

  // Handle fields change
  // const handleChange = (input) => e => {  
  //   setValue({ ...value, [input]: e.target.value });
  // };

  const handleNext = () => {
    // console.log(activeStep);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setFormData("");
    setActiveStep(0);
  };

  const handleSubmit = ()=>{
    AuthService.createNewLead(FormData)
    .then(function (response) {
      ModalChange();
      fetchData();
    })
    .catch(function (error) {
      //  setTimeout(() => {
      //      setError("");
      //  }, 5000);
       // return setError(error.response.data.message);   
    })  
  }

  const renderStepContent = (step) => {
    switch (step) {
      case 1:
        return <UserModal FormData={FormData} setFormData={setFormData} handleNext={handleNext} />;
      case 2:
        return <RadixModal FormData={FormData} setFormData={setFormData} handleNext={handleNext} handleBack={handleBack} />;
      case 3:
        return <LeadModal FormData={FormData} setFormData={setFormData} handleNext={handleNext} handleBack={handleBack} />;        
      case 4:
        return <ConfirmModal FormData={FormData} setFormData={setFormData} handleSubmit={handleSubmit} handleBack={handleBack} />;        
      default:
        return <div>Not Found</div>;
    }
  }

  function updateData(filters) {
    setFilterValue(filters);
  }

  useEffect(() => {
    fetchData();
  }, [filterValue]);
        
  const fetchData = async () => {
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
    <Grid container spacing={4}>
      <Grid item md={12} xs={12} sm={12}>
        <RadixFilter filterValue={filterValue} updateData={updateData} />
        <AddButton handleChange={
          ()=>{
            setOpenModal(true);
            handleNext();
          }
        }>
          Add data
        </AddButton>          
        <Modal openModal={openmodal} Title="Create New Leads" organization="radix" closeModal={ModalChange}>
          <Stepper activeStep={activeStep} alternativeLabel  color="#fff">
            {Steps.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {renderStepContent(activeStep)}
          </React.Fragment>
        </Modal>
        {
          !loading && leadData &&
          <CommonTable filterValue={filterValue} LeadHeadCells={CommonLeadHeadCells} tableData={leadData} updateData={updateData} fetchData={fetchData}/>
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
