import React,{useState,useEffect} from 'react';
import Modal from './modal';
import PhysicalReviewModal from '../../components/modals/physical-modal'
import ConfirmPhysicalReviewModal from '../../components/modals/confirm-physical-modal'
import AuthService from "../../authServices/apicalls";
import { CircularProgress } from "@material-ui/core";

const EditModal = ({id, reload, openModal, organization, closeModal}) => {
    const [activeStep, setActiveStep]  = useState(0);
    const [FormData, setFormData] = useState("");
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        AuthService.getPhysicalReviewById(id).then(
            (data) => {
              console.log(data);
                setFormData(data);                // setName(data.name);
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
            return <PhysicalReviewModal FormData={FormData} setFormData={setFormData} handleNext={handleNext} />;
          case 1:
            return <ConfirmPhysicalReviewModal FormData={FormData} setFormData={setFormData} handleSubmit={handleSubmit} handleBack={handleBack} />;
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
        AuthService.updatePhysicalReviewById(FormData)
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
            <Modal Title="Edit Physical Review" openModal={openModal} closeModal={closeModal}>
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
