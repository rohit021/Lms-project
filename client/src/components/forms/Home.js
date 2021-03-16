import React,{ useEffect ,useState} from 'react';
import {Grid, Button, CircularProgress, Avatar} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import axios from 'axios'
// import FormFilter from './form-filter'
import FormTable from './formtable'
import FormModal from '../modals/form-modal'
import moment from 'moment';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
const API = "https://formbackend11.herokuapp.com";
const THEME = createMuiTheme({
  typography: {
  //  "fontFamily": `"Roboto", "Helvetica", "Arial", sans-serif`,
  //  "fontSize": 25,
  //  "fontWeightLight": 300,
  //  "fontWeightRegular": 400,
  //  "fontWeightMedium": 500
  }
});

const defaultData = {
    startDate:moment().format('YYYY-MM-01'),
    endDate:moment().format('YYYY-MM-DD'),
    // rating:'',
    // minVal:'',
    // maxVal:'',
    organization:''
}
const Home = (props) => {
    const [filterValue,setFilterValue] = useState(defaultData);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState(false);
    const [openmodal, setOpenModal] = useState(false);
    
  const handleChange =()=>{
    if(openmodal) {
      setOpenModal(false);
    }else {
      setOpenModal(true);
    }    
  }
    
    function updateData(filters) {
        setFilterValue(filters);
      }
      useEffect(() => {
        fetchData();        
      }, [filterValue]);
    
      const fetchData = async() => {        
        // console.log(filterValue);
        try{
          setLoading(true);  
          await axios.post(`${API}/form/datas`,filterValue).then(function (response) {
            setFormData(response.data.forms)
          })
        }
          catch(err) {
              console.log(err);
            }
            setLoading(false);
      }
    return(
      <MuiThemeProvider theme={THEME}>
        <Grid item md={12} xs={12} sm={12}>
        {/* <FormFilter filterValue={filterValue} updateData={updateData}/> */}
        {/* <Button variant="contained" color="primary" style={{ margin:"0 50px"}} onClick={handleChange}>
        Add Data
        </Button>
        {openmodal? <FormModal  openModal={openmodal} closeModal = {handleChange} />:''}       
          {
            !loading && formData && <FormTable tableData={formData}/>            
          }
          {
            loading &&  <CircularProgress color='primary' size={30} thickness={4} />
          }
          
          {
            !loading && !formData && 	<Avatar 
		        src="https://cdn.dribbble.com/users/1449854/screenshots/4136663/no_data_found.png"
		        alt="no data found" 
            style={{width: "40%",
            height: "30%",
            margin: 'auto'}}
            />
          } */}
          
      </Grid>
      </MuiThemeProvider>
    )
}

export default withRouter(Home);