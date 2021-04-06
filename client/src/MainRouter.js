import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import LoginPage from "./pages/authentication/login/login";
import RegisterPage from "./pages/authentication/register/register";
import ResetPass from "./pages/authentication/resetpass";
import NewPass from "./pages/authentication/newpass";
import PrivateRoute from "./components/routing/PrivateRoute";
import Layout from "./components/layout/layout";
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
      </Switch>
    </div>
  );
};

export default MainRouter;
