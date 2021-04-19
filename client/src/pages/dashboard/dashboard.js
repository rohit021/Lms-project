import React from 'react'
import CardModal from '../../components/cards/cards'
import StarIcon from '@material-ui/icons/Star';
import { Grid, Paper, Typography, makeStyles
} from '@material-ui/core';

export const CardsData = [
    { id: 0, header: "Total Leads", data: "3435446", icon: <StarIcon/> ,footer:"show all Leads" },
    { id: 1, header: "Total Reviews", data: "343546", icon: <StarIcon/> ,footer:"show all Reviews" },
    { id: 2, header: "Total Physcial Reviews", data: "000000", icon: <StarIcon/> ,footer:"show all Physcial Reviews" },
    
]

const Dashboard =()=>{
    return(
        <React.Fragment>
        <Grid
        container
        spacing={2}
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
    >
        <Grid item md={4} xs={4} sm={4}>
            {CardsData.map(value => <CardModal key={value} header={value.header} data={value.data} icon={value.icon} footer={value.footer} />)}
        </Grid>
        </Grid>
        </React.Fragment>
    )
}

export default Dashboard;