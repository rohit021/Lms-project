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
import BackToTopButton from "../../components/widget/backtoTop";
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
  const [limit, setLimit] = useState(30);
  const [IsFetching, setIsFetching] = useState(false);
  const [skip, setSkip] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [AlertCheck, setAlertCheck] = useState(false);
  const [AlertType, setAlertType] = useState('');
  const [AlertMsg, setAlertMsg] = useState('');
  const [FormData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    isNegative: false,
    center: filterValue.center,
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
  const nextPage = () => {
    setSkip(skip + limit);
    setLimit(10);
    setIsFetching(true);      
}

const previousPage = () => {
    setSkip(skip - limit)
}

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
      center: filterValue.center,
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
        return <PhysicalReviewModal FormData={FormData} setFormData={setFormData} handleNext={handleNext} />;
      case 2:
        return <ConfirmPhysicalReviewModal FormData={FormData} setFormData={setFormData} handleSubmit={handleSubmit} handleBack={handleBack} />;
      default:
        return <div>Not Found</div>;
    }
  }

  function updateData(filters) {
    setFormData({ ...FormData, "center": filters.center });
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

  const FetchMoreData=()=>{
    setIsFetching(true);
    AuthService.getAllPhysicalReview(filterValue, limit, skip).then(
      (data) => {
        for (var i = 0; i < data.reviews.length; i++) {
          var newData = data.reviews[i];
          setReviewData(currentArray => [...currentArray, newData]);
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
    if (windowBottom >= docHeight-500) {
      nextPage();
    } else {    
    // x
    // console.log("windows bottom",windowBottom)
    // console.log("window height",windowHeight)
    // console.log("doc",docHeight)
    }
  }
  
  // http://blog.sodhanalibrary.com/2016/08/detect-when-user-scrolls-to-bottom-of.html#.YHcYe-gzbmd

  const fetchData = async () => {
    setLoading(true);
    AuthService.getAllPhysicalReview(filterValue, limit, skip).then(
      (data) => {
        setReviewData(data.reviews);
        setLoading(false);                
      },
      (error) => {
        console.log(error);
      }
    );
  };

  return (
    <Grid container spacing={4}>
      <Grid item md={12} xs={12} sm={12}>
        <BackToTopButton />
        <PhysicalReviewFilter filterValue={filterValue} updateData={updateData} />
        <AddButton handleChange={
          () => {
            setOpenModal(true);
            handleNext();
          }
        }>
          Add Review
        </AddButton>
        {AlertCheck && <Alert msg={AlertMsg} type={AlertType} />}
        <Modal openModal={openmodal} Title="Create New Physical Review" closeModal={ModalChange}>
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
          <PhysicalReviewTable filterValue={filterValue} LeadHeadCells={CommonLeadHeadCells} tableData={ReviewData} updateData={updateData} fetchData={fetchData} />
        }
        {IsFetching && (
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
