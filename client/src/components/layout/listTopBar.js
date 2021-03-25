import React, {useState} from "react";
import { Grid, Typography, makeStyles } from "@material-ui/core";
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
const useStyles = makeStyles(theme => ({
title : {
  font: "Poppins-Regular",
  fontWeight:800,
  margin:"10px auto",
 
},
tableHeader:{
  borderBottom:"2px solid" ,

},
GridBlock: {
    display:"flex",
    alignItems:"center"
},
filterMenu: {
  position:"relative",
  display:"block",
  "&:hover":{
    
    display:"none"
  }
}
}));

const TopBar = ({Data, LeadsSort}) => {
  const [ShowArrow, setShowArrow] = useState(false);
  const classes = useStyles();

  const changeDropDown = () =>{
    if(ShowArrow){
      setShowArrow(false);
    }
    else{
      setShowArrow(true);
    }
  }

  return (
    <Grid container spacing ={1} className={classes.tableHeader}>
            {
              Data.map((value, index) => (
                <Grid key={index} item md={value.md} xs={value.xs} sm={value.sm}  className={classes.GridBlock}>
                  <Typography className={classes.title} onClick={()=> LeadsSort(value.text)} >{value.text}</Typography>
                  <span className={classes.filterMenu} onClick={changeDropDown}>{ShowArrow ? <ArrowDropDownIcon/> :<ArrowDropUpIcon/>}</span>
                </Grid>
              ))
            }
      </Grid>
      
  );
};

export default TopBar;

