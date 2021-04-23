import React, { useState } from 'react'
import { useHistory, useParams } from "react-router-dom";
import { Grid, FormControl, MenuItem, TextField,makeStyles} from '@material-ui/core';
import AnardanaPhysicalReviews from "../../pages/physicalreviews/anardana-physical-review";
import AnardanaReviews from "../../pages/reviews/anardana-reviews";
export const reviewSwitcherOptions = [
    { "key": 'online', "text": 'Online', "value": 'Online' },
    { "key": 'physical', "text": 'Physical', "value": 'Physical' },
]
const useStyles = makeStyles((theme) => ({
    selectStyle: {
      minWidth: '100%',
      textAlign:"center"
    },
  }));
const ReviewSwitcher = () => {
    const classes = useStyles();
    const { id } = useParams();
    const [value, setValue] = useState(id);
    const history = useHistory();
    console.log(id)
        return (
            <React.Fragment>
                <Grid container spacing={1} >
                <Grid item md={2} xs={2} sm={2}>
                    <FormControl className={classes.selectStyle} >
                        <TextField
                        style={{
                            minWidth:'100%'
                        }}
                            size="small"
                            select
                            label="Mode"
                            name="mode"
                            value={value}
                            onChange={(event) => {
                                setValue(event.target.value)
                                history.push(`/app/reviews/anardana-reviews/${event.target.value}`);
                            }}
                        >
                            {reviewSwitcherOptions.map((option, index) => <MenuItem key={index} value={option.value}>{option.text}</MenuItem>)}
                        </TextField>
                    </FormControl>
                </Grid>
                </Grid>
                {
                    value==='Online'?<AnardanaReviews />:<AnardanaPhysicalReviews/>  
                }
            </React.Fragment>
        );
    
}
export default ReviewSwitcher;