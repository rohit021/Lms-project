import React from "react";
import {Paper, TextField, Grid, Typography} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";


const useStyles = makeStyles(theme=>({
  paper: {
    display: "flex",
    flexDirection: "column",
    boxShadow: '1px 3px 5px 3px #d4d0d0',
    padding: 5,
    flexGrow: 1,
    overflow: "hidden",
  },
  widgetHeader: {
    fontFamily: "Poppins-Regular",
    display: "flex",
    alignItems: "center",
  },
}));

export default function Widget({children, header, label, filterData, handleChange 
}) {
  var classes = useStyles();
  return (
    <React.Fragment>
      <Paper className={classes.paper}>
        <Grid container spacing={1}>
          <Grid item md={3} xs={6} sm={5} className={classes.widgetHeader}>
            <Typography variant="h5" color="textSecondary" noWrap className={classes.widgetHeader}>
              {header}
            </Typography>
          </Grid>
          <Grid item md={6} xs={12} sm={6}>
            <TextField
              label={label}
              name="search"
              style={{  minWidth: '100%'}}
              value={filterData.search}
              onChange={handleChange()}
              InputProps={{
                endAdornment: (
                <InputAdornment >
                <IconButton>
                <SearchIcon />
                </IconButton>
                </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item md={12} xs={12} sm={12}>
          {children}
          </Grid>
        </Grid>
      </Paper>
    </React.Fragment>
  );
}
