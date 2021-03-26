import React from "react";
import {Route, Switch, Redirect, withRouter} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
// components
import Header from "../header/header";
import Sidebar from "../sidebar/sidebar";
import classnames from "classnames";
// pages
// import Dashboard from "../../pages/dashboard";
import RadixLeads from "../../pages/leads/radixLeads";
import AnardanaLeads from "../../pages/leads/anardanaLeads";
import RelpLeads from "../../pages/leads/relpLeads";
import WoodappleLeads from "../../pages/leads/woodappleLeads";
import HarvinLeads from "../../pages/leads/harvinLeads";
// import Typography from "../../pages/typography";
// import Notifications from "../../pages/notifications";
// import Maps from "../../pages/maps";
// import Tables from "../../pages/tables";
// import Icons from "../../pages/icons";
// import Charts from "../../pages/charts";

  //Reviews
  import RadixReviews from "../../pages/reviews/radixReviews";
  import AnardanaReviews from "../../pages/reviews/anardanaReviews";
  import RelpReviews from "../../pages/reviews/relpReviews";
  import WoodappleReviews from "../../pages/reviews/woodappleReviews";
  import HarvinReviews from "../../pages/reviews/harvinReviews";



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
                render={() => <Redirect to="/app/leads/radixLeads" />}
              />
                  <Route
                exact
                path="/app/reviews"
                render={() => <Redirect to="/app/reviews/radixReviews" />}
              />
          {/* <Route path="/app/typography" component={Typography} />
          <Route path="/app/tables" component={Tables} />
          <Route path="/app/notifications" component={Notifications} />
          <Route
              exact
              path="/app/ui"
            render={() => <Redirect to="/app/ui/icons" />}
          /> */}
          <Route path="/app/leads/radixLeads" component={RadixLeads} />
          <Route path="/app/leads/anardanaLeads" component={AnardanaLeads} />
          <Route path="/app/leads/woodappleLeads" component={WoodappleLeads} />
          <Route path="/app/leads/relpLeads" component={RelpLeads}/>
          <Route path="/app/leads/harvinLeads" component={HarvinLeads} />

            {/* Route for Reviews */}

            <Route path="/app/reviews/radixReviews" component={RadixReviews} />
          <Route path="/app/reviews/anardanaReviews" component={AnardanaReviews} />
          <Route path="/app/reviews/woodappleReviews" component={WoodappleReviews} />
          <Route path="/app/reviews/relpReviews" component={RelpReviews}/>
          <Route path="/app/reviews/harvinReviews" component={HarvinReviews} />

        </Switch>
          {/* <footer className={classes.footer}>
            <Copyright />
          </footer> */}
        </div>
      </div>
      

    //     <>
    //       <Header history={props.history} onDrawerToggle={handleDrawerToggle} />
    //       <Sidebar />
    //       <div
    //       className={[classes.content, classes.contentShift].join(' ')}>
    //         {/* className={ classnames(classes.content, {
    //           [classes.contentShift]: layoutState.isSidebarOpened,
    //         })} */}
    //       {/* > */}
    //         <div className={classes.fakeToolbar} />
    //         <Switch>
    //           {/* <Route path="/app/dashboard" component={Dashboard} />
    //           <Route path="/app/leads" component={Leads} /> */}
    //           {/* <Route path="/app/typography" component={Typography} />
    //           <Route path="/app/tables" component={Tables} />
    //           <Route path="/app/notifications" component={Notifications} />
    //           <Route
    //             exact
    //             path="/app/ui"
    //             render={() => <Redirect to="/app/ui/icons" />}
    //           />
    //           <Route path="/app/ui/maps" component={Maps} />
    //           <Route path="/app/ui/icons" component={Icons} />
    //           <Route path="/app/ui/charts" component={Charts} /> */}
    //         </Switch>
    //       </div>
    //     </>
    // </div>
  );
}

export default withRouter(Layout);
