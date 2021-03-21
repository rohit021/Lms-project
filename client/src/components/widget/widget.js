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
  widgetWrapper: {
    display: "flex",
    minHeight: "100%",
  },
  widgetHeader: {
    padding: theme.spacing(3),
    paddingBottom: theme.spacing(1),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  widgetRoot: {
    boxShadow: "0px 3px 11px 0px #E8EAFC, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A",
  },
  widgetBody: {
    paddingBottom: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingLeft: theme.spacing(3),
  },
  noPadding: {
    padding: 0,
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    overflow: "auto",
  },
  moreButton: {
    margin: -theme.spacing(1),
    padding: 0,
    width: 40,
    height: 40,
    color: theme.palette.text.hint,
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: "rgba(255, 255, 255, 0.35)",
    },
  },
  noWidgetShadow: {
    boxShadow: 'none'
  }
}));

export default function Widget({
  children,
  title,
  noBodyPadding,
  bodyClass,
  disableWidgetMenu,
  header,
  noHeaderPadding,
  headerClass,
  style,
  noWidgetShadow,
  ...props
}) {
  var classes = useStyles();
  return (
    <React.Fragment>
      <div className={classes.widgetWrapper} style={style && {...style}}>
        <Paper className={classes.paper} classes={{ root: classnames(classes.widgetRoot, {
          [classes.noWidgetShadow]: noWidgetShadow
          }) }}>
          <div className={classnames(classes.widgetHeader, {
            [classes.noPadding]: noHeaderPadding,
            [headerClass]: headerClass
          })}>
            {header}
          </div>
          <div
            className={classnames(classes.widgetBody, {
              [classes.noPadding]: noBodyPadding,
              [bodyClass]: bodyClass,
            })}
          >
            {children}
          </div>
        </Paper>
      </div>
    </React.Fragment>
  );
}
