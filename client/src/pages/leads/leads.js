import React, {useState, useEffect } from "react";
import { Grid, Avatar, Paper, CircularProgress,Button } from "@material-ui/core";
import LeadTable from "../../components/leads/leadtable";
import LeadFilter from "../../components/leads/lead-filter";
import AuthService from "../../authServices/apicalls";
import LeadModal from '../../components/modals/form-modal'
import ListTopBar from '../../components/layout/listTopBar'
import moment from "moment";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme=>({
  paper: {
    display: "flex",
    flexDirection: "column",
    boxShadow: '1px 3px 5px 3px #d4d0d0',
    padding: 15,
    margin: "50px auto",
    flexGrow: 1,
  },
}));

const defaultData = {
  startDate: moment().format("YYYY-MM-01"),
  endDate: moment().format("YYYY-MM-DD"),
  // rating:'',
  // minVal:'',
  source:'',
  organization: "",
};

const topBarValues = [
	{text: 'S.No', md:1, xs:3, sm:1},
	{text: 'Name', md:2, xs:3, sm:2},
	{text: 'Date', md:1, xs:3, sm:2},
	{text: 'Email', md:2, xs:3, sm:1},
	{text: 'Phone', md:2, xs:2, sm:2},
	{text: 'Organization', md:2, xs:3, sm:2},
	{text: 'Source', md:1, xs:3, sm:2},
  {text: 'Actions', md:1, xs:3, sm:2},    
]
  
const Leads = () => {
    const [filterValue, setFilterValue] = useState(defaultData);
    const [loading, setLoading] = useState(false);
    const [leadData, setleadData] = useState(null);
    const [openmodal, setOpenModal] = useState(false);
  
    const handleChange = () => {
      if (openmodal) {
        setOpenModal(false);
      } else {
        setOpenModal(true);
      }
    };
  
    function updateData(filters) {
      setFilterValue(filters);
    }
    useEffect(() => {
      fetchData();
    }, [filterValue]);
                           
    const fetchData = async () => {
        console.log(filterValue);
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
      };
      
    const classes = useStyles();

    return (
       <Grid container spacing={4}>
          <Grid item md={12} xs={12} sm={12}>
        
        <LeadFilter filterValue={filterValue} updateData={updateData} />
        <Button
          variant="contained"
          color="primary"
          style={{ float:"right", margin:"5px auto",background:"#01579b", color:"#fff" }}
          onClick={handleChange}
        >
          Add Data
        </Button>
        {openmodal ? <LeadModal openModal={openmodal} closeModal={handleChange} /> : ''}
        {/* {openmodal? <FormModal  openModal={openmodal} closeModal = {handleChange} />:''}        */}
        {!loading && leadData && (
        <Paper className={classes.paper}>
        <ListTopBar data={topBarValues}/>
        {!loading && leadData && leadData.map((data, index)=>(
                //  <Widget title="Material-UI Table" upperTitle noBodyPadding bodyClass={classes.tableOverflow}>
            <LeadTable tableData={data} key={index} index={index} fetchData={fetchData} />
              //  </Widget>
            
        )) }
        </Paper>)}
        {loading && (
          <CircularProgress color="primary" size={30} thickness={4} />
        )}

        {!loading && !leadData && (
          <Avatar
            src="https://cdn.dribbble.com/users/1449854/screenshots/4136663/no_data_found.png"
            alt="no data found"
            style={{ width: "40%", height: "80%", margin: "auto" }}
          />
        )}
      </Grid>
      </Grid>
    )
}

export default Leads;
