import React, { useState, useEffect } from "react";
import { Grid, Stepper, Step, StepLabel, CircularProgress } from "@material-ui/core";
import ReviewTable from "../../components/table/review-table";
import PageTitle from "../../components/widget/pagetitle";
import ReviewFilter from "../../components/filters/review-filter";
import ReviewModal from '../../components/modals/review-modal'
import CardGroup from '../../components/cardgroup/cardgroup';
import Modal from '../../components/modals/modal';
import Alert from "../../components/alert/toaster"
import ConfirmReviewModal from '../../components/modals/confirm-review-modal'
import AddButton from '../../components/addbutton/addbutton'
import NotFound from "../../components/widget/notfound";
import { ReviewSteps } from '../../helpers/utils';
import BackToTopButton from "../../components/widget/backtoTop";
import AuthService from "../../authServices/apicalls";
import moment from "moment";
const formattedTodayDate = moment().format("YYYY-MM-DD");

const defaultData = {
  startDate: moment().format("YYYY-MM-01"),
  endDate: moment().format("YYYY-MM-DD"),
  orderBy: 'date',
  order: 'desc',
  isNegative:false,
  organization: "radix",
};

const RadixReviews = () => {
  const [filterValue, setFilterValue] = useState(defaultData);
  const [loading, setLoading] = useState(false);
  const [openmodal, setOpenModal] = useState(false);
  const [ReviewData, setReviewData] = useState(null);
  const [AlertCheck, setAlertCheck] = useState(false);
  const [AlertType, setAlertType] = useState('');
  const [AlertMsg, setAlertMsg] = useState('');
  const [limit, setLimit] = useState(30);
  const [IsFetching, setIsFetching] = useState(false);
  const [moreData, setmoreData] = useState(false);
  const [skip, setSkip] = useState(0);
  const [CardData, setCardData] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [FormData, setFormData] = useState({
    name: "",
    review: "",
    reply: "",
    rating: "",
    isNegative: false,
    platform: "",
    center: "--",
    organization: "radix",
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
      reply: "",
      rating: "",
      isNegative: false,
      platform: "",
      center: "--",
      organization: "radix",
      date: formattedTodayDate,
    });
    setActiveStep(0);
  };

  const handleSubmit = () => {
    AuthService.createNewReview(FormData)
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
        return <ReviewModal FormData={FormData} setFormData={setFormData} handleNext={handleNext} />;
      case 2:
        return <ConfirmReviewModal FormData={FormData} setFormData={setFormData} handleSubmit={handleSubmit} handleBack={handleBack} />;
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
    const fetchRatingData = async () => {
      await AuthService.getReviewRatings(filterValue).then(
        (data) => {
          setCardData(data);
        },
        (error) => {
          console.log(error);
        }
      );
      setLoading(false);
    };

    fetchData();
    fetchRatingData();
  }, [filterValue]);

  useEffect(() => {
    if(IsFetching){
      FetchMoreData();
    }    
  }, [IsFetching]);
  
  const fetchData = async () => {
    setLoading(true);
    await AuthService.getAllReviews(filterValue, limit, skip).then(
      (data) => {
        setReviewData(data.reviews);
      },
      (error) => {
        console.log(error);
      }
    );
    setLoading(false);
  };
  
  const FetchMoreData=()=>{
    AuthService.getAllReviews(filterValue, limit, skip).then(
      (data) => {
        if(data.reviews){
          setmoreData(true);
          for (var i = 0; i < data.reviews.length; i++) {
            var newData = data.reviews[i];
            setReviewData(currentArray => [...currentArray, newData]);
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
        <PageTitle title="Radix Reviews" nodivider />
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
        {AlertCheck && <Alert msg={AlertMsg} type={AlertType} />}
        <Modal openModal={openmodal} Title="Create New Review" closeModal={ModalChange}>
          <Stepper activeStep={activeStep - 1} alternativeLabel color="#fff">
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
        {IsFetching && !moreData && (
          <h2>Fetching More Data ...</h2>
        )}  
        {loading && (
          <CircularProgress color="primary" size={30} thickness={4} />
        )}
        {!loading && !ReviewData && <NotFound />}
      </Grid>
    </Grid>
  )
}

export default RadixReviews;
