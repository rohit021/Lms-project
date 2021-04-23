import React, { useState, useEffect } from "react";
import { Grid, Stepper, Step, StepLabel, CircularProgress } from "@material-ui/core";
import CommonTable from "../../components/table/table";
import CommonFilter from "../../components/filters/filter";
import AuthService from "../../authServices/apicalls";
import AddButton from '../../components/addbutton/addbutton'
import Modal from '../../components/modals/modal';
import UserModal from '../../components/modals/user-modal';
import RadixModal from '../../components/modals/radix-modal';
import Alert from "../../components/alert/toaster"
import LeadModal from '../../components/modals/lead-modal';
import ConfirmModal from '../../components/modals/confirm-modal';
import NotFound from "../../components/widget/notfound";
import BackToTopButton from "../../components/widget/backtoTop";
import { Steps, CommonLeadHeadCells } from '../../helpers/utils';
import moment from "moment";
const formattedTodayDate = moment().format("YYYY-MM-DD");

const defaultData = {
  startDate: moment().format("YYYY-MM-01"),
  endDate: moment().format("YYYY-MM-DD"),
  source: '',
  status: '',
  orderBy: 'date',
  order: 'desc',
  organization: "radix",
};

const RadixLeads = () => {
  const [filterValue, setFilterValue] = useState(defaultData);
  const [loading, setLoading] = useState(false);
  const [leadData, setleadData] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [AlertCheck, setAlertCheck] = useState(false);
  const [AlertType, setAlertType] = useState('');
  const [AlertMsg, setAlertMsg] = useState('');
  const [limit, setLimit] = useState(30);
  const [IsFetching, setIsFetching] = useState(false);
  const [moreData, setmoreData] = useState(false);
  const [skip, setSkip] = useState(0);
  const [openmodal, setOpenModal] = useState(false);
  const [FormData, setFormData] = useState({
    name: " ",
    email: "",
    phone: "",
    source: "",
    radixDepartment: "",
    doctor: "",
    location: "",
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

  const handleNext = () => {
    // console.log(activeStep);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setFormData({
      name: " ",
      email: "",
      phone: "",
      source: "",
      radixDepartment: "",
      doctor: "",
      location: "",
      priority: "",
      expectedAmount: "",
      organization: "radix",
      date: formattedTodayDate,

    });
    setActiveStep(0);
  };

  const handleSubmit = () => {
    AuthService.createNewLead(FormData)
      .then(function (response) {
        ModalChange();
        fetchData();
        setAlertMsg(response.message);
        setAlertType("success");
        setAlertCheck(true);
        setTimeout(() => {
          setAlertCheck(false)
        }, 3000)
      })
      .catch(function (error) {
        ModalChange();
        setAlertCheck(true);
        setAlertType("error");
        setAlertMsg("Something went Wrong");
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
  const nextPage = () => {
    setSkip(skip + limit);
    setLimit(10);
    setIsFetching(true);      
  }
  
  function updateData(filters) {
    setSkip(0);
    setLimit(30);
    setFilterValue(filters);
  }
  
  useEffect(() => {
    fetchData();
  }, [filterValue]);

  useEffect(() => {
    if(IsFetching){
      FetchMoreData();
    }    
  }, [IsFetching]);

  const fetchData = async () => {
    setLoading(true);
    await AuthService.getAllLeads(filterValue, limit, skip).then(
      (data) => {
        setleadData(data.leads);
      },
      (error) => {
        console.log(error);
      }
    );
    setLoading(false);
  };

  const FetchMoreData = async ()=>{
    await AuthService.getAllLeads(filterValue, limit, skip).then(
      (data) => {
        if(data.leads){
          setmoreData(true);
          for (var i = 0; i < data.leads.length; i++) {
            var newData = data.leads[i];
            setleadData(currentArray => [...currentArray, newData]);
          }
          setmoreData(false);
        }
        setIsFetching(false);  
      },
      (error) => {
        console.log(error);
      }
    );
  }
  
  onscroll=()=> {
    const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight-10) {
      nextPage();
    }
  };

  return (
    <Grid container spacing={4}>
      <Grid item md={12} xs={12} sm={12}>
        <BackToTopButton />
        <CommonFilter filterValue={filterValue} updateData={updateData} />
        <AddButton handleChange={
          () => {
            setOpenModal(true);
            handleNext();
          }
        }>
          Add data
        </AddButton>
        {AlertCheck && <Alert msg={AlertMsg} type={AlertType} />}
        <Modal openModal={openmodal} Title="Create New Leads" organization="radix" closeModal={ModalChange}>
          <Stepper activeStep={activeStep - 1} alternativeLabel color="#fff">
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
          <CommonTable filterValue={filterValue} LeadHeadCells={CommonLeadHeadCells} tableData={leadData} updateData={updateData} fetchData={fetchData} />
        }
        {IsFetching && !moreData && (
          <h2>Fetching More Data ...</h2>
        )}  
        {loading && (
          <CircularProgress color="primary" size={30} thickness={4} />
        )}
        {!loading && !leadData && <NotFound />}
      </Grid>
    </Grid>
  )
}

export default RadixLeads;
