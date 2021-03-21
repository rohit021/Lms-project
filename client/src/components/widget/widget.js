import React, { useState } from "react";
import {
  Paper,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";
import { MoreVert as MoreIcon } from "@material-ui/icons";
import classnames from "classnames";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme=>({
  paper: {
    display: "flex",
    flexDirection: "column",
    boxShadow: '1px 3px 5px 3px #d4d0d0',
    padding: 5,
    flexGrow: 1,
    overflow: "auto",
  },
  widgetHeader: {
    padding: theme.spacing(2),
    paddingBottom: theme.spacing(1),
    fontFamily: "Poppins-Regular",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

export default function Widget({
  children,
  header,
  ...props
}) {
  var classes = useStyles();
  return (
    <React.Fragment>
      <Paper className={classes.paper}>
        <Typography variant="h5" color="textSecondary" noWrap className={classes.widgetHeader}>
          {header}
        </Typography>
        {children}
      </Paper>
    </React.Fragment>
  );
}
