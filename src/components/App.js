import React from "react";
import "../App.css"
import { AuthProvider } from "../contexts/AuthContext";
import {BrowserRouter as Router,Switch,Route} from "react-router-dom"
import Header from "./Header";
import Home from "./Home";
import Signup from './Signup'
import Login from "./Login"
import PrivateRoute from "./PrivateRoute"
import ForgotPassword from "./ForgotPassword"
import UpdateProfile from "./UpdateProfile";
import Dashboard from "./Dashboard";
import Username from "./Username";


function App() {
  return (
    
    <div className="app">
    
    <Router>
      <AuthProvider>
      <Header />
        <Switch>
          <PrivateRoute exact path="/" component={Home}/>
          <PrivateRoute path="/update-profile" component={UpdateProfile}/>
          <PrivateRoute path="/dashboard" component={Dashboard}/>
          <Route path="/username" component={Username}/>
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/forgot-password" component={ForgotPassword} />
        </Switch>
      </AuthProvider>
    </Router>
    </div>
    
  );
}

export default App;
