import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import LoginPage from "./pages/authentication/login/Login";
import RegisterPage from "./pages/authentication/register/Register";
import ResetPass from "./pages/authentication/resetpass";
import NewPass from "./pages/authentication/newpass";
import PrivateRoute from "./components/routing/PrivateRoute";
import Layout from "./components/layout/layout";
import My404Component from "./components/widget/my404component"
const MainRouter = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/app/dashboard" />} />
        <PrivateRoute path="/app" component={Layout} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/reset-password" component={ResetPass} />
        <Route path="/auth/reset/:id" component={NewPass} />
        <Route exact path='*' component={My404Component} />
      </Switch>
    </div>
  );
};

export default MainRouter;
