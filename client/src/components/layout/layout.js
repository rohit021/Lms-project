import React from "react";
import {Route, Switch, Redirect, withRouter} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
// components
import Header from "../header/header";
import Sidebar from "../sidebar/sidebar";
import classnames from "classnames";
// pages
// import Dashboard from "../../pages/dashboard";
import RadixLeads from "../../pages/leads/radix-leads";
import AnardanaLeads from "../../pages/leads/anardana-leads";
import RelpLeads from "../../pages/leads/relp-leads";
import WoodappleLeads from "../../pages/leads/woodapple-leads";
// import Typography from "../../pages/typography";
// import Notifications from "../../pages/notifications";
// import Maps from "../../pages/maps";
// import Tables from "../../pages/tables";
// import Icons from "../../pages/icons";
// import Charts from "../../pages/charts";

  //Reviews
  import RadixReviews from "../../pages/reviews/radix-reviews";
  import AnardanaReviews from "../../pages/reviews/anardana-reviews";
  import AnardanaPhysicalReviews from "../../pages/physicalreviews/anardana-physical-review";
  
  // context
import { useLayoutState } from "../../context/LayoutContext";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    maxWidth: "100vw",
    overflowX: "hidden",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    width: `calc(100vw - 240px)`,
    minHeight: "100vh",
  },
  contentShift: {
    width: `calc(100vw - ${240 + theme.spacing(6)}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  fakeToolbar: {
    ...theme.mixins.toolbar,
  },
}));

const Layout = (props)=> {
  var classes = useStyles();
  var layoutState = useLayoutState();

  return (
    <div className={classes.root}>
      <Header history={props.history} />
      <Sidebar />
      <div
        className={classnames(classes.content, {
          [classes.contentShift]: layoutState.isSidebarOpened,
        })}
      >
        <div className={classes.fakeToolbar} />
        <Switch>
          {/* <Route path="/app/dashboard" component={Dashboard} /> */}
          {/* <Route path="/app/leads" component={Leads} /> */}
          <Route
            exact
            path="/app/leads"
            render={() => <Redirect to="/app/leads/radix-leads" />}
          />
          <Route
            exact
            path="/app/physicalreviews"
            render={() => <Redirect to="/app/physicalreviews/anardana-physical-reviews" />}
          />
          <Route
            exact
            path="/app/reviews"
            render={() => <Redirect to="/app/reviews/radix-reviews" />}
          />
          {/* <Route path="/app/typography" component={Typography} />
          <Route path="/app/tables" component={Tables} />
          <Route path="/app/notifications" component={Notifications} />
          <Route
              exact
              path="/app/ui"
            render={() => <Redirect to="/app/ui/icons" />}
          /> */}
          <Route path="/app/leads/radix-leads" component={RadixLeads} />
          <Route path="/app/leads/anardana-leads" component={AnardanaLeads} />
          <Route path="/app/leads/woodapple-leads" component={WoodappleLeads} />
          <Route path="/app/leads/relp-leads" component={RelpLeads}/>

          {/* Route for Reviews */}

          <Route path="/app/reviews/radix-reviews" component={RadixReviews} />
          <Route path="/app/reviews/anardana-reviews" component={AnardanaReviews} />
          
          {/* Route for Physical Reviews */}
          <Route path="/app/physicalreviews/anardana-physical-reviews" component={RadixLeads} />
          
        </Switch>
          {/* <footer className={classes.footer}>
            <Copyright />
          </footer> */}
        </div>
      </div>
  );
}

export default withRouter(Layout);
