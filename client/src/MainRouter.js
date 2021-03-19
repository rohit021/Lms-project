import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Login from "./pages/authentication/login/Login";
import Register from "./pages/authentication/register/Register";
import ResetPass from "./pages/authentication/resetpass";
import NewPass from "./pages/authentication/newpass";
import TopNavbar from "./components/layout/navbar.js";
import PrivateRoute from './components/routing/PrivateRoute'
import Home from "./pages/dashboard/dashboard";
import Leads from "./pages/dashboard/leads";
const MainRouter = () => {
    return (<div>
      {/* <TopNavbar/> */}
      <Switch>
        <PrivateRoute  exact path="/" component={Home}/>
        <PrivateRoute  exact path="/dashboard" component={Home}/>
        <Route path="/register" component={Register}/>
        <Route path="/login" component={Login}/>        
        <Route path="/reset-password" component={ResetPass}/>   
        <Route path="/auth/reset/:id" component={NewPass}/>        
        <PrivateRoute path="/viewLeads" component={Leads}/>    
      </Switch>
    </div>)
}

export default MainRouter