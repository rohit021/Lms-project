import React, { useState, useEffect } from "react";
import { Grid, Stepper, Step, StepLabel, CircularProgress } from "@material-ui/core";
import moment from "moment";
import PhysicalReviewTable from "../../components/table/physical-review-table";
import PhysicalReviewFilter from "../../components/filters/physical-filter";
import PhysicalReviewModal from '../../components/modals/physical-modal'
import Modal from '../../components/modals/modal';
import ConfirmPhysicalReviewModal from '../../components/modals/confirm-physical-modal'
import AddButton from '../../components/addbutton/addbutton'
import NotFound from "../../components/widget/notfound";
import { ReviewSteps } from '../../helpers/utils';
import AuthService from "../../authServices/apicalls";
import Alert from "../../components/alert/toaster"
const formattedTodayDate = moment().format("YYYY-MM-DD");

const defaultData = {
  startDate: moment().format("YYYY-MM-01"),
  endDate: moment().format("YYYY-MM-DD"),
  orderBy: 'date',
  center: 'Vikas Marg',
  order: 'desc',
  organization: "anardana",
};

const RadixReviews = () => {
  const [filterValue, setFilterValue] = useState(defaultData);
  const [loading, setLoading] = useState(false);
  const [openmodal, setOpenModal] = useState(false);
  const [ReviewData, setReviewData] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [AlertCheck, setAlertCheck] = useState(false);
  const [AlertType, setAlertType] = useState('');
  const [AlertMsg, setAlertMsg] = useState('');
  const [FormData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    isNegative: false,
    center:filterValue.center,
    starFood: "",
    starClean: "",
    starPlace: "",
    starService: "",
    starMusic: "",
    organization: "anardana",
    date: formattedTodayDate,
  });

  const ModalChange = () => {
    if (openmodal) {
      handleReset();
      setOpenModal(false);
    } else {
      setOpenModal(true);
      handleNext();
    }
  };

  const CommonLeadHeadCells = [
    { id: 'date', disablePadding: false, label: 'Date' },
  ];

  const handleNext = () => {
    // console.log(activeStep);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setFormData({
      name: "",
      phone: "",
      email: "",
      isNegative: false,
      center:filterValue.center,
      starFood: "",
      starClean: "",
      starPlace: "",
      starService: "",
      starMusic: "",
      organization: "anardana",
      date: formattedTodayDate,
    });
    setActiveStep(0);
  };

  const handleSubmit = () => {
    AuthService.createNewPhysicalReview(FormData)
      .then(function (response) {
        setAlertMsg(response.message);
        ModalChange();
        fetchData();
        setAlertType("success");
        setAlertCheck(true);
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
        return <PhysicalReviewModal FormData={FormData} setFormData={setFormData} handleNext={handleNext} />;
      case 2:
        return <ConfirmPhysicalReviewModal FormData={FormData} setFormData={setFormData} handleSubmit={handleSubmit} handleBack={handleBack} />;
      default:
        return <div>Not Found</div>;
    }
  }

  function updateData(filters) {    
    setFormData({ ...FormData, "center":filters.center });
    setFilterValue(filters);
  }
  useEffect(() => {
    fetchData();
  }, [filterValue]);

  const fetchData = async () => {
    setLoading(true);
    AuthService.getAllPhysicalReview(filterValue).then(
      (data) => {
        setReviewData(data.reviews);
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
        <PhysicalReviewFilter filterValue={filterValue} updateData={updateData} />
        <AddButton handleChange={
          () => {
            setOpenModal(true);
            handleNext();
          }
        }>
          Add Review
        </AddButton>
        {AlertCheck && <Alert msg={AlertMsg} type={AlertType}/> }
        <Modal openModal={openmodal} Title="Create New Physical Review" closeModal={ModalChange}>
          <Stepper activeStep={activeStep-1} alternativeLabel color="#fff">
            {ReviewSteps.map(label => (
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
          !loading && ReviewData &&
          <PhysicalReviewTable filterValue={filterValue} LeadHeadCells={CommonLeadHeadCells} tableData={ReviewData} updateData={updateData} fetchData={fetchData} />
        }
        {loading && (
          <CircularProgress color="primary" size={30} thickness={4} />
        )}
        {!loading && !ReviewData && <NotFound />}
      </Grid>
    </Grid>
  )
}

export default RadixReviews;
