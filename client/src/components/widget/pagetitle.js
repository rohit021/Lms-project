import React from "react";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    pageTitle: {
        fontFamily: "Poppins-Regular",
    },
}));

const PageTitle = ({ title, nodivider }) => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Typography variant="h4"  component="h2" className={classes.pageTitle}>
                {title}
            </Typography>
            {nodivider ? null : <Divider />}
        </React.Fragment>
    );
};

export default PageTitle;
