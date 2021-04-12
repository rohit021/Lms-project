import React,{useState,useEffect} from 'react';
import Modal from './modal';
import ReviewModal from '../../components/modals/review-modal';
import ConfirmReviewModal from '../../components/modals/confirm-review-modal'
import AuthService from "../../authServices/apicalls";
import { CircularProgress } from "@material-ui/core";

const EditModal = ({id, edit, reload, openModal, organization, closeModal}) => {
    const [activeStep, setActiveStep]  = useState(0);
    const [FormData, setFormData] = useState("");
    const [loading, setLoading] = useState(false);
    console.log(organization);
    useEffect(() => {
        setLoading(true);
        AuthService.getReviewById(id).then(
            (data) => {
                setFormData(data);
            },
            (error) => {
                console.log(error);
            }
        );
        setLoading(false); 
    }, []);
   
      const renderStepContent = (step) => {
        switch (step) {
          case 0:
            return <ReviewModal edit ={edit} FormData={FormData} setFormData={setFormData} handleNext={handleNext} />;
           case 1:
              return <ConfirmReviewModal edit ={edit} FormData={FormData} setFormData={setFormData} handleSubmit={handleSubmit} handleBack={handleBack} />;
            default:
              return <div>Not Found</div>;
        }
    }
          
    const handleNext = () => {
        // console.log(activeStep);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      };
    
      const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
      };
    
      const handleReset = () => {
        // setFormData("");
        setActiveStep(0);
      };
      const handleSubmit = ()=>{
        AuthService.updateReviewById(FormData)
        .then(function (response) {
            reload();

        })
        .catch(function (error) {
          //  setTimeout(() => {
          //      setError("");
          //  }, 5000);
           // return setError(error.response.data.message);   
        })  
      }
    
    // console.log(props);
    return (
        <React.Fragment>
            {!loading  && FormData &&
            <Modal Title="Edit Review " openModal={openModal} closeModal={closeModal}>
                {renderStepContent(activeStep)}
            </Modal>
            }
              {loading && (
          <CircularProgress color="primary" size={30} thickness={4} />
            )}
            
        </React.Fragment>
    )
}

export default EditModal;
