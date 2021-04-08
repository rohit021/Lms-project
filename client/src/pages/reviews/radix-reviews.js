import React, {useState, useEffect } from "react";
import { Grid, Avatar, CircularProgress,Button } from "@material-ui/core";
import ReviewTable from "../../components/review/reviewtable";
import ReviewFilter from "../../components/review/review-filter";
import AuthService from "../../authServices/apicalls";
import ReviewModal from '../../components/modals/review-modal'
// import ListTopBar from '../../components/layout/listTopBar'
import moment from "moment";

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
  
const RadixReviews = () => {
  const [filterValue, setFilterValue] = useState(defaultData);
  const [loading, setLoading] = useState(false);
  const [reviewData, setreviewData] = useState(null);
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
      setLoading(true);
      AuthService.getAllReviews(filterValue).then(
        (data) => {
          setreviewData(data.reviews);
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
        {/* <LeadFilter filterValue={filterValue} updateData={updateData} defaultData={defaultData} /> */}
        <Button
          variant="contained"
          color="primary"
          style={{ float:"right", margin:"5px auto",background:"#01579b", color:"#fff" }}
          onClick={handleChange}
        >
        Add Data
        </Button>
        {openmodal ? <ReviewModal openModal={openmodal} organization="radix" closeModal={handleChange} /> : ''}
        {
          !loading && reviewData &&
            <ReviewTable filterValue={filterValue} tableData={reviewData} updateData={updateData} fetchData={fetchData} />
        }
        {loading && (
          <CircularProgress color="primary" size={30} thickness={4} />
        )}
        {!loading && !reviewData && (
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

export default RadixReviews;
