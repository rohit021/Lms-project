import React, { useState, useEffect } from 'react'
import { Grid, Typography } from "@material-ui/core";
import CardWithIcon from "../../components/cards/cards_icon"
import CardWithSide from "../../components/cards/card_side"
import AuthService from "../../authServices/apicalls"

export const CardsData = [
    { id: 0, title: "Radix Healthcare", leadsvalue: "343", reviewvalue: "343", icon: <i class="fa fa-star-o" aria-hidden="true"></i> },
    { id: 1, title: "Anardana", leadsvalue: "343", reviewvalue: "343", icon: <i class="fa fa-star-o" aria-hidden="true"></i> },
    { id: 2, title: "Woodapple Residency", leadsvalue: "343", reviewvalue: "343", icon: <i class="fa fa-star-o" aria-hidden="true"></i> },
    // { id: 2, title: "Relp ", leadsvalue: "343", reviewvalue: "343", icon: <i class="fa fa-star-o" aria-hidden="true"></i> },
]

export const CardsTotalData = [
    { id: 0, title: "Total Leads", value:"" , icon: <i class="fa fa-star-o" aria-hidden="true"></i> ,footer:"show all Leads" },
    { id: 1, title: "Total Reviews", value: "", icon: <i class="fa fa-bolt" aria-hidden="true"></i> ,footer:"show all Reviews" },
    { id: 2, title: "Total Physical Reviews", value: "", icon: <i class="fa fa-user-o" aria-hidden="true"></i> ,footer:"show all Physical Reviews" },    
]


const Dashboard = () => {
    const [totalData, setTotalData] = useState([''])
    const[sideData, setSideData]=useState([''])
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        AuthService.getTotalLeads().then(
            (Leaddata) => {
                setLoading(true)
                // const newItem = CardsData.find(item => item.id === 0);
                const item = CardsTotalData.find(item => item.id === 0);
                item.value = Leaddata["total count"]
                AuthService.getTotalReviews().then(
                    (Reviewdata) => {
                        const item = CardsTotalData.find(item => item.id === 1);
                        item.value = Reviewdata["total count"]
                        AuthService.getTotalPhysicalReviews().then(
                            (PhysicalReviewdata) => {
                                const item = CardsTotalData.find(item => item.id === 2);
                                item.value = PhysicalReviewdata["total count"]
                                setTotalData(CardsTotalData);
                                setLoading(false)
                            }
                        )
                        // setTotalData(CardsTotalData);
                    }
                )
                // setTotalData(CardsTotalData);
            }
        )
    };
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
                <CardWithSide CardsData={CardsData} />                
            </Grid>
        </Grid>
    )
}

export default Dashboard;
