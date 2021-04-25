import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    Card,
    Grid,
    CardActions,
    CardContent,
    Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: "-1.5% auto 10px auto",
        display: "flex",
        minWidth: "25%",
        boxShadow: '1px 3px 5px 3px #d4d0d0',
        width: "300px",
        borderRadius: "10px",
        flexDirection: "column",
    },
    title: {
        textAlign: "center",
        fontSize: "16px",
        fontWeight: "700",
    },
}));

const SimpleCard = ({ title, data }) => {
    const classes = useStyles();
    return (
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <Typography
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                >
                    {title}
                </Typography>
                <Typography variant="h3" component="h2" align="center">
                        {data ? data : 0}
                    </Typography>
            </CardContent>
        </Card>
    );
};

export default SimpleCard;
