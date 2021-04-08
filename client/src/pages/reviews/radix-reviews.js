import React, {useState, useEffect } from "react";
import { Grid, Stepper, Step, StepLabel, Avatar, CircularProgress,Button } from "@material-ui/core";
import ReviewTable from "../../components/review/reviewtable";
import ReviewFilter from "../../components/review/review-filter";
import AuthService from "../../authServices/apicalls";
import ReviewModal from '../../components/modals/review-modal'
import ConfirmLeadModal from '../../components/modals/confirm-review-modal'
import Modal from '../../components/modals/modal';
import {Steps, CommonLeadHeadCells} from '../../helpers/utils';

// import ListTopBar from '../../components/layout/listTopBar'
import moment from "moment";
import { Done } from "@material-ui/icons";
const formattedTodayDate = moment().format("YYYY-MM-DD");
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


  
const RadixReviews = () => {
  const [filterValue, setFilterValue] = useState(defaultData);
  const [loading, setLoading] = useState(false);
  const [openmodal, setOpenModal] = useState(false);
  const [activeStep, setActiveStep]  = useState(0);
  const [ReviewData, setReviewData] = useState({
    name:"",
   review:"",
   rating:"",
   isNegative:false,
   platform:"",
    organization:"radix",
    date: formattedTodayDate,
  });
  
  const handleChange = () => {
    if (openmodal) {
      setOpenModal(false);
      handleReset();
    } else {
      setOpenModal(true);
      handleNext();
    }
  };
  
  const ModalChange = () => {
    if (openmodal) {
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
    setReviewData("");
    setActiveStep(0);
  };



  const handleSubmit = ()=>{

     console.log("inside handle submit",ReviewData)
      AuthService.createNewReview(ReviewData)
      .then(function (response) {
        console.log("done")
      })
      // .catch(function (error) {
      //   //  setTimeout(() => {
      //   //      setError("");
      //   //  }, 5000);
      //    // return setError(error.response.data.message);   
      // })  
    }


  function updateData(filters) {
    setFilterValue(filters);
  }
  
  // useEffect(() => {
  //   fetchData();
  // }, [filterValue]);
        
  // const fetchData = async () => {
  //     setLoading(true);
  //     AuthService.getAllReviews(filterValue).then(
  //       (data) => {
  //         setReviewData(data.reviews);
  //       },
  //       (error) => {
  //         console.log(error);
  //       }
  //     );
  //     setLoading(false);
  //   };

    const renderStepContent = (step) => {
      switch (step) {
        case 1:
          // {openmodal ? <ReviewModal openModal={openmodal}  ReviewData={ReviewData} setReviewData={setReviewData}  handleSubmit={handleSubmit} organization="radix" closeModal={handleChange} /> : ''}
          return <ReviewModal openModal={openmodal}  ReviewData={ReviewData} setReviewData={setReviewData} handleNext={handleNext}  handleSubmit={handleSubmit} organization="radix" closeModal={handleChange} />;
        case 2:
          return <ConfirmLeadModal ReviewData={ReviewData} setReviewData={setReviewData} handleSubmit={handleSubmit} handleBack={handleBack} />;    
        default:
          return <div>Not Found</div>;
      }
    }



  return (
    <Grid container spacing={4}>
      <Grid item md={12} xs={12} sm={12}>
    
        <Button
          variant="contained"
          color="primary"
          style={{ float:"right", margin:"5px auto",background:"#01579b", color:"#fff" }}
          onClick={handleChange}
        >
        Add Data
        </Button>
        <Modal openModal={openmodal} Title="Create New Review"   organization="radix" closeModal={ModalChange}>
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
        {/* {
          !loading && ReviewData &&
            <ReviewTable filterValue={filterValue} tableData={ReviewData} updateData={updateData} fetchData={fetchData} />
        } */}
        {/* {loading && (
          <CircularProgress color="primary" size={30} thickness={4} />
        )} */}
        {/* {!loading && !ReviewData && (
          <Avatar
          src="https://cdn.dribbble.com/users/1449854/screenshots/4136663/no_data_found.png"
          alt="no data found"
          style={{ width: "40%", height: "80%", margin: "auto" }}
          />
        )} */}
      </Grid>
    </Grid>
  )
}

export default RadixReviews;
