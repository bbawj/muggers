import React from "react";
import "../App.css";
import { AuthProvider } from "../contexts/AuthContext";
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import NavBar from "./NavBar/NavBar";
import Home from "./Home";
import Signup from './AuthPages/Signup';
import Login from "./AuthPages/Login";
import PrivateRoute from "./PrivateRoute";
import {ReRoute, ReRouteUsername} from "./ReRoute"
import ForgotPassword from "./AuthPages/ForgotPassword";
import UpdateProfile from "./AuthPages/UpdateProfile";
import Dashboard from "./Dashboard";
import Username from "./AuthPages/Username";
import { AppProvider } from "../contexts/AppContext";

function App() {
  
  return (
    
    <div className="app">
      <Router>
        <AuthProvider>
        <NavBar />
          <Switch>
          <ReRoute exact path="/" component={Home}/>
          <Route path="/login" component={Login} />
            <PrivateRoute path="/update-profile" component={UpdateProfile}/>
            <ReRouteUsername path="/username" component={Username}/>
            <Route path="/signup" component={Signup} />
            
            <Route path="/forgot-password" component={ForgotPassword} />
            
          </Switch>
          <AppProvider>
            <Switch>
              <PrivateRoute path="/dashboard" component={Dashboard}/>
            </Switch>
          </AppProvider>
        </AuthProvider>
        </Router>
    </div>
    
    
  );
}

export default App;
