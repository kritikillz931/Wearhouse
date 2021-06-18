import React from "react";
import { Route, Redirect, useHistory } from "react-router-dom";
import { ApplicationViews } from "./components/ApplicationViews";
import { NavBar } from "./components/NavBar/NavBar";
import { Login } from "./components/Auth/Login";
import { Register } from "./components/Auth/Register";
import WEARHOUSELOGO from "./components/Images/WEARHOUSELOGO.png"
import "./components/Auth/Login.css"
import { Button } from 'reactstrap';
import backgroundImg from "./components/Images/SNEAKERS.jpg"
import {Landing} from "./components/Auth/Landing"


export const Wearhouse = () => {
const history = useHistory()
  // style for background image on login page

return (
  <>
    <Route
      render={() => {
        if (localStorage.getItem("wearhouse_user")) {
          return (
            <>
              <NavBar />
              
              <ApplicationViews />
              <>
    </>
            </>
          );
        }
      }}
    />

    <Route exact path="/">
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