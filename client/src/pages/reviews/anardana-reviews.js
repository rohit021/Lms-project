import React, { useState, useEffect } from "react";
import { Grid, Stepper, Step, StepLabel, CircularProgress } from "@material-ui/core";
import moment from "moment";
import ReviewTable from "../../components/table/review-table";
import ReviewFilter from "../../components/filters/review-filter";
import ReviewModal from '../../components/modals/review-modal'
import CardGroup from '../../components/cardgroup/cardgroup';
import Modal from '../../components/modals/modal';
import ConfirmReviewModal from '../../components/modals/confirm-review-modal'
import AddButton from '../../components/addbutton/addbutton'
import NotFound from "../../components/widget/notfound";
import { ReviewSteps } from '../../helpers/utils';
import AuthService from "../../authServices/apicalls";
const formattedTodayDate = moment().format("YYYY-MM-DD");

const defaultData = {
  startDate: moment().format("YYYY-MM-01"),
  endDate: moment().format("YYYY-MM-DD"),
  center: 'Vikas Marg',
  orderBy: 'date',
  order: 'desc',
  organization: "anardana",
};

const AnardanaReviews = () => {
  const [filterValue, setFilterValue] = useState(defaultData);
  const [loading, setLoading] = useState(false);
  const [openmodal, setOpenModal] = useState(false);
  const [ReviewData, setReviewData] = useState(null);
  const [CardData, setCardData] = useState(null);  
  const [activeStep, setActiveStep] = useState(0);
  const [FormData, setFormData] = useState({
    name: "",
    review: "",
    rating: "",
    isNegative: false,
    center:filterValue.center,
    platform: "",    
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
      review: "",
      rating: "",
      isNegative: false,
      center:filterValue.center,
      platform: "",    
      organization: "anardana",
      date: formattedTodayDate,
    });
    setActiveStep(0);
    setFormData({organization: "anardana"})
  };

  const handleSubmit = () => {
    AuthService.createNewReview(FormData)
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
        return <ReviewModal FormData={FormData} setFormData={setFormData} handleNext={handleNext} />;
      case 2:
        return <ConfirmReviewModal FormData={FormData} setFormData={setFormData} handleSubmit={handleSubmit} handleBack={handleBack} />;
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

  useEffect(() => {
    fetchRatingData();
  }, [filterValue]);

  const fetchRatingData = async () => {
    AuthService.getReviewRatings(filterValue).then(
      (data) => {
        setCardData(data);
      },
      (error) => {
        console.log(error);
      }
    );
    setLoading(false);
  };

  const fetchData = async () => {
    setLoading(true);
    AuthService.getAllReviews(filterValue).then(
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
        {CardData && <CardGroup data={CardData} />} 
        <ReviewFilter filterValue={filterValue} updateData={updateData} />
        <AddButton handleChange={
          () => {
            setOpenModal(true);
            handleNext();
          }
        }>
          Add Review
        </AddButton>
        <Modal openModal={openmodal} Title="Create New Review" closeModal={ModalChange}>
          <Stepper activeStep={activeStep} alternativeLabel color="#fff">
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
          <ReviewTable filterValue={filterValue} LeadHeadCells={CommonLeadHeadCells} tableData={ReviewData} updateData={updateData} fetchData={fetchData} />
        }
        {loading && (
          <CircularProgress color="primary" size={30} thickness={4} />
        )}
        {!loading && !ReviewData && <NotFound />}
      </Grid>
    </Grid>
  )
}

export default AnardanaReviews;
