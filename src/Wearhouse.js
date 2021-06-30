import React from "react";
import { Route,  useHistory, Redirect } from "react-router-dom";
import { ApplicationViews } from "./components/ApplicationViews";
import { NavBar } from "./components/NavBar/NavBar";
import { Login } from "./components/Auth/Login";
import { Register } from "./components/Auth/Register";
import WEARHOUSELOGO from "./components/Images/WEARHOUSELOGO.png"
// import "./components/Auth/Login.css"
import "./App.css"
import { Button } from 'reactstrap';
import backgroundImg from "./components/Images/newbg.jpg"
import {Landing} from "./components/Auth/Landing"
import {ReminderList} from "./components/Homepage/RemindersList"


export const Wearhouse = () => {

  
return (
  <>
    <Route
      render={() => {
        if (localStorage.getItem("wearhouse_user")) {
          return (
            <>
            <section className="wholePageBackground">
              <NavBar />
              
              <ApplicationViews />
              </section>
              <>
    </>
            </>
          );
        } else {
          return (
          <>
          <section className="wholePageBackground">
            <Redirect to="/home" />
            </section>
            </>
          );
        }
      }}
    />

     <Route exact path="/home">
      <Landing />
    </Route> 
    <Route path="/Login">
      <Login />
    </Route>
    <Route path="/Register">
      <Register />
    </Route>
  </>
)
};