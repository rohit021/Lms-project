import React from 'react'
import {Route, Redirect, Switch} from 'react-router-dom'
import Login from "./pages/authentication/login/Login";
import Register from "./pages/authentication/register/Register";
import ResetPass from "./pages/authentication/resetpass";
import NewPass from "./pages/authentication/newpass";
import PrivateRoute from './components/routing/PrivateRoute'
import Layout from "./components/layout/layout";
const MainRouter = () => {
    return (
    <div>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/app/dashboard" />} />
        <PrivateRoute path="/app" component={Layout} />
        <Route path="/register" component={Register}/>
        <Route path="/login" component={Login}/>        
        <Route path="/reset-password" component={ResetPass}/>   
        <Route path="/auth/reset/:id" component={NewPass}/>        
      </Switch>
    </div>)
}

export default MainRouter