import React from 'react'
import { Grid, Typography } from "@material-ui/core";
import CardWithIcon from "../../components/cards/cards_icon"
// import CardWithSide from "../../components/cards/card_side"

export const CardsTotalData = [
    { id: 0, title: "Total Leads", value: "3435446", icon: <i class="fa fa-star-o" aria-hidden="true"></i> ,footer:"show all Leads" },
    { id: 1, title: "Total Reviews", value: "343546", icon: <i class="fa fa-bolt" aria-hidden="true"></i> ,footer:"show all Reviews" },
    { id: 2, title: "Total Physical Reviews", value: "000000", icon: <i class="fa fa-user-o" aria-hidden="true"></i> ,footer:"show all Physical Reviews" },    
]

export const CardsData = [
    { id: 0, title: "Radix Healthcare", leadsvalue: "343", reviewvalue: "343", icon: <i class="fa fa-star-o" aria-hidden="true"></i> },
    { id: 1, title: "Anardana", leadsvalue: "343", reviewvalue: "343", icon: <i class="fa fa-star-o" aria-hidden="true"></i> },
    { id: 2, title: "Woodaple Residency", leadsvalue: "343", reviewvalue: "343", icon: <i class="fa fa-star-o" aria-hidden="true"></i> },
    // { id: 2, title: "Relp ", leadsvalue: "343", reviewvalue: "343", icon: <i class="fa fa-star-o" aria-hidden="true"></i> },
]


const Dashboard = () => {
    return (
        <Grid container spacing={4}>
            <Grid item md={12} xs={12} sm={12}>
                <Typography variant="h5" color="textSecondary" style={{fontWeight:"600"}} noWrap >
                    Overview
                </Typography>
                <CardWithIcon CardsData={CardsTotalData} />
            </Grid>
            <Grid item md={12} xs={12} sm={12}>
                <Typography variant="h5" color="textSecondary" style={{fontWeight:"600"}} noWrap >
                    Products
                </Typography>
                {/* <CardWithSide CardsData={CardsData} />                 */}
            </Grid>
        </Grid>
    )
}

export default Dashboard;
