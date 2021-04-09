import React,{useState,useEffect} from 'react';
import Modal from './modal';
import UserModal from '../../components/modals/user-modal';
import RadixModal from '../../components/modals/radix-modal';
import AnardanaModal from '../../components/modals/anardana-modal';
import RelpModal from '../../components/modals/relp-modal';
import WoodappleModal from '../../components/modals/woodapple-modal';
import LeadModal from '../../components/modals/lead-modal';
import ConfirmModal from '../../components/modals/confirm-modal';
import AuthService from "../../authServices/apicalls";
import { CircularProgress } from "@material-ui/core";

const EditModal = ({id, reload, openModal, organization, closeModal}) => {
    const [activeStep, setActiveStep]  = useState(0);
    const [FormData, setFormData] = useState("");
    const [loading, setLoading] = useState(false);
    console.log(organization);
    useEffect(() => {
        setLoading(true);
        AuthService.getLeadById(id).then(
            (data) => {
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
            return <UserModal FormData={FormData} setFormData={setFormData} handleNext={handleNext} />;
          case 1:
                switch (organization) {
                    case "radix":
                        return <RadixModal FormData={FormData} setFormData={setFormData} handleNext={handleNext} handleBack={handleBack} />;
                    case "anardana":
                        return <AnardanaModal FormData={FormData} setFormData={setFormData} handleNext={handleNext} handleBack={handleBack} />;        
                    case "relp":
                        return <RelpModal FormData={FormData} setFormData={setFormData} handleNext={handleNext} handleBack={handleBack} />;        
                    case "woodapple":
                        return <WoodappleModal FormData={FormData} setFormData={setFormData} handleNext={handleNext} handleBack={handleBack} />;        
                    default:
                        break;
                }
          case 2:
            return <LeadModal FormData={FormData} setFormData={setFormData} handleNext={handleNext} handleBack={handleBack} />;        
          case 3:
            return <ConfirmModal FormData={FormData} setFormData={setFormData} handleSubmit={handleSubmit} handleBack={handleBack} />;        
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
        AuthService.updateLeadById(FormData)
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
            <Modal Title="Edit Leads" openModal={openModal} closeModal={closeModal}>
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
