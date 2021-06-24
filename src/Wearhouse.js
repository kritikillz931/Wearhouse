import React from "react";
import { Route,  useHistory, Redirect } from "react-router-dom";
import { ApplicationViews } from "./components/ApplicationViews";
import { NavBar } from "./components/NavBar/NavBar";
import { Login } from "./components/Auth/Login";
import { Register } from "./components/Auth/Register";
import WEARHOUSELOGO from "./components/Images/WEARHOUSELOGO.png"
import "./components/Auth/Login.css"
import { Button } from 'reactstrap';
import backgroundImg from "./components/Images/newbg.jpg"
import {Landing} from "./components/Auth/Landing"
import {ReminderList} from "./components/Homepage/RemindersList"


export const Wearhouse = () => {

  var sectionStyle = {
    width: "100%",
    height: "937px",
    backgroundImage: `url(${backgroundImg})`
};


return (
  <>
    <Route
      render={() => {
        if (localStorage.getItem("wearhouse_user")) {
          return (
            <>
              <NavBar />
            <section style={sectionStyle}>
              
              <ApplicationViews />
              </section>
              <>
    </>
            </>
          );
        } else {
          return (
          <>
          <section style={sectionStyle}>
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