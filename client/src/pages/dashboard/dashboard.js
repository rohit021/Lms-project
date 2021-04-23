import React, { useState, useEffect } from 'react'
import { Grid, Typography } from "@material-ui/core";
import CardWithIcon from "../../components/cards/cards_icon"
import CardWithSide from "../../components/cards/card_side"
import AuthService from "../../authServices/apicalls"

export const OverviewCardsData = [
    { id: 0, title: "Total Leads", link: "/app/leads", icon: <i class="fa fa-star-o" aria-hidden="true"></i>, footer:"Show all Leads" },
    { id: 1, title: "Total Reviews", link: "/app/reviews/radix-reviews",  icon: <i class="fa fa-bolt" aria-hidden="true"></i>, footer:"Show all Reviews" },
    { id: 2, title: "Total Physical Reviews", link: "/app/reviews/anardana-reviews/Physical", icon: <i class="fa fa-user-o" aria-hidden="true"></i>, footer:"Show all Physical Reviews" },    
]

export const ProductsCardsData = [
    { id: 0, title: "Radix Healthcare", leadlink: "/app/leads/radix-leads", reviewlink: "/app/reviews/radix-reviews", icon: <i class="fa fa-star-o" aria-hidden="true"></i> },
    { id: 1, title: "Anardana", leadlink: "/app/leads/anardana-leads", reviewlink: "/app/reviews/anardana-reviews", icon: <i class="fa fa-star-o" aria-hidden="true"></i> },
    { id: 2, title: "Woodapple Residency", leadlink: "/app/leads/woodapple-leads", reviewlink: "", icon: <i class="fa fa-star-o" aria-hidden="true"></i> },
    // { id: 3, title: "Relp ",   icon: <i class="fa fa-star-o" aria-hidden="true"></i> },
]

const Dashboard = () => {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        AuthService.getTotalLeads().then(
            (Leaddata) => {
                setLoading(true);
                // Updating the overview lead count value
                const overviewLeaddata = OverviewCardsData.find(item => item.id === 0);
                overviewLeaddata.value = Leaddata["total count"];
                // getting the leaddata and updating the specific organizations leads
                Leaddata["lead Detail"].map((Data)=>{
                    if(Data.organization === "radix"){
                        const productLeaddata = ProductsCardsData.find(item => item.id === 0);
                        productLeaddata.leadsvalue = Data.count;
                    }
                    if(Data.organization ==="anardana"){
                        const productLeaddata = ProductsCardsData.find(item => item.id === 1);
                        productLeaddata.leadsvalue = Data.count;
                    }
                    if(Data.organization ==="woodapple"){
                        const productLeaddata = ProductsCardsData.find(item => item.id === 2);
                        productLeaddata.leadsvalue = Data.count;
                    }
                })
                AuthService.getTotalReviews().then(
                    (Reviewdata) => {
                        // Updating the overview review count value
                        const overviewReviewdata = OverviewCardsData.find(item => item.id === 1);
                        overviewReviewdata.value = Reviewdata["total count"];
                        // getting the reviewdata and updating the specific organizations reviews               
                        Reviewdata["Reviews Detail"].map((Data)=>{
                            if(Data.organization ==="radix"){
                                const productReviewdata = ProductsCardsData.find(item => item.id === 0);
                                productReviewdata.reviewvalue = Data.count
                            }
                            if(Data.organization ==="anardana"){
                                const productReviewdata = ProductsCardsData.find(item => item.id === 1);
                                productReviewdata.reviewvalue = Data.count
                            }
                            if(Data.organization ==="woodapple"){
                                const productReviewdata = ProductsCardsData.find(item => item.id === 2);
                                productReviewdata.reviewvalue = Data.count
                            }
                        })
                        AuthService.getTotalPhysicalReviews().then(
                            (PhysicalReviewdata) => {
                                 // Updating the overview physical review count value
                                const overviewPhysicalReviewdata = OverviewCardsData.find(item => item.id === 2);
                                overviewPhysicalReviewdata.value = PhysicalReviewdata["total count"]
                                setLoading(false)
                            }
                        )
                        // setTotalData(OverviewCardsData);
                    }
                )
                // setTotalData(OverviewCardsData);
            }
        )
    };
    return (
        <Grid container spacing={4}>
            <Grid item md={12} xs={12} sm={12}>
                <Typography variant="h5" color="textSecondary" style={{fontWeight:"600"}} noWrap >
                    Overview
                </Typography>
                {!loading && <CardWithIcon CardsData={OverviewCardsData} />}
            </Grid>
            <Grid item md={12} xs={12} sm={12}>
                <Typography variant="h5" color="textSecondary" style={{fontWeight:"600"}} noWrap >
                    Products
                </Typography>
                {!loading && <CardWithSide CardsData={ProductsCardsData} /> }
            </Grid>
        </Grid>
    )
}

export default Dashboard;
