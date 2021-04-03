import React, {useState, useEffect } from "react";
import { Grid, CircularProgress } from "@material-ui/core";
import RadixLeadTable from "../../components/leads/radix-lead-table";
import RadixFilter from "../../components/leads/radix-lead-filter";
import AuthService from "../../authServices/apicalls";
import AddButton from '../../components/addbutton/addbutton'
import ConfirmModal from '../../components/modals/confirmInfo-modal'
import NotFound from "../../components/widget/notfound"
import UserDetailsModal from '../../components/modals/user-modal'
import RadixModal from '../../components/modals/RadixModal'
import LeadInfoModal from '../../components/modals/leadInfo-modal'
// import ListTopBar from '../../components/layout/listTopBar'
import moment from "moment";
import { PropertyNameOptions } from "../../helpers/utils";

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
  
const RadixLeads = ({closeModal}) => {
  const [filterValue, setFilterValue] = useState(defaultData);
  const [loading, setLoading] = useState(false);
  const [leadData, setleadData] = useState(null);
  const[step, setStep]=useState(0)
  const [error, setError] = useState("");
   const[openmodal, setOpenModal]=useState(false);
   const[value,setValue]=useState({
     name:'',
     email:'',
     phone: '',
     source:'',
     radixDepartment:'',
     doctor:'',
     location:'',
     priority:'',
     expectedAmount:'',
     organization:'radix',
     date:''

   })
  const ModalChange = () => {
    console.log("inside" ,openmodal)
    if (openmodal) {

      setOpenModal(false);
   resetStep();
   setValue("")


    } else {
      setOpenModal(true);

    }
  };

  // Handle fields change
 const  handleChange = (input) => e => {  
    setValue({ ...value, [input]: e.target.value });
  };
      // Proceed to next step
   const nextStep = () => {
    setStep(step+1)
    setOpenModal(true)

  };
  const resetStep =()=>{
    setStep(0)
  }
  const saveData=async (event)=>{
                                    // resetStep()
                                    console.log("save data is called")
                                     let payload={
                                      name:value.name,
                                      email:value.email,
                                      phone: value.phone,
                                      source:value.source,
                                      radixDepartment:value.radixDepartment,
                                      doctor:value.doctor,
                                      location:value.location,
                                      priority:value.priority,
                                      expectedAmount:value.expectedAmount,
                                      organization:'radix',
                                    }
                                    console.log("Payload is called")
                                      console.log("payload value is", payload)
                                    AuthService.createNewLead(payload)
                                    .then(function (response) {
                                      console.log("inside Create Lead")
                                        closeModal()
                                        // window.location.reload();
                                    })
                                    .catch(function (error) {
                                        setTimeout(() => {
                                            setError("");
                                        }, 5000);
                                        // return setError(error.response.data.message);   
                                    })  



                                  }
    const prevStep=()=>{
      setStep(step-1)
    }
  function updateData(filters) {
    setFilterValue(filters);
  }
 const stepChange=(step)=>{
  //  console.log(value)
  //  console.log(step);
    switch(step){
      case 1:
       return (
         <React.Fragment>
           { openmodal ?<UserDetailsModal organization='radix' openModal={openmodal } closeModal={ModalChange} 
           nextStep={nextStep}
            handleChange={handleChange}
            value={value}
            />:''}
          {/* {openmodal ? <UserDe openModal={openmodal} organization="radix" closeModal={ModalChange} /> : ''}  */}

        
         </React.Fragment>
         
       )
     case 2:
       return (
          <React.Fragment>
          { openmodal ?<RadixModal openModal={openmodal }  closeModal={ModalChange} 
          handleChange={handleChange}
             nextStep={nextStep}
             prevStep={prevStep}
             value={value}
             />:''}
         </React.Fragment>
         
       )
     case 3:
       return (
        <React.Fragment>
        { openmodal ?<LeadInfoModal openModal={openmodal } closeModal={ModalChange} 
           nextStep={nextStep}
           prevStep={prevStep}
           handleChange={handleChange}
           value={value}
           />:''}
       </React.Fragment>
       );
     case 4:
       return (
        <React.Fragment>
        { openmodal ?<ConfirmModal openModal={openmodal } closeModal={ModalChange} 
           saveData={saveData}
           prevStep={prevStep}
           handleChange={handleChange}
           
           value={value}
           />:''}
       </React.Fragment>
      );
      // <Success />;
     default:
       (console.log('This is a multi-step form built with React.'))
 }

  }
  
  
  useEffect(() => {
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
  }, [filterValue]);

  return (
    <Grid container spacing={4}>
      <Grid item md={12} xs={12} sm={12}>
        <RadixFilter filterValue={filterValue} updateData={updateData} />
        {/* <AddButton onClick={setStep(step+1)}> Add data </AddButton>  */}
        <AddButton handleChange ={()=>{
        
          setOpenModal(true);
          setStep(step+1)}} > Add data </AddButton> 
        
        {/* onClick={() => onSortFilterChange(option.value)} */}
        
        
        {stepChange(step)}

        {/* {openmodal ? <RadixModal openModal={openmodal} organization="radix" closeModal={ModalChange} /> : ''} */}


        {
          !loading && leadData &&
            <RadixLeadTable filterValue={filterValue} tableData={leadData} updateData={updateData}/>
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
