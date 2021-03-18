import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Login from "./pages/authentication/login/Login";
import Register from "./pages/authentication/register/Register";
import ResetPass from "./pages/authentication/resetpass";
import NewPass from "./pages/authentication/newpass";
import PrivateRoute from './components/routing/PrivateRoute'
import Home from "./pages/dashboard/home";

const MainRouter = () => {
    return (<div>
      {/* <TopNavbar/> */}
      <Switch>
        <PrivateRoute  exact path="/" component={Home}/>
        <Route path="/register" component={Register}/>
        <Route path="/login" component={Login}/>        
        <Route path="/reset-password" component={ResetPass}/>   
        <Route path="/auth/reset/:id" component={NewPass}/>        
      </Switch>
    </div>)
}

export default MainRouter