import React from "react";
import "../App.css";
import { AuthProvider } from "../contexts/AuthContext";
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./Home";
import Signup from './Signup';
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import {ReRoute, ReRouteUsername} from "./ReRoute"
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";
import Dashboard from "./Dashboard";
import Username from "./Username";
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
