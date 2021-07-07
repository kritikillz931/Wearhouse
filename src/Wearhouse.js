import React from "react";
import { Route, Redirect } from "react-router-dom";
import { ApplicationViews } from "./components/ApplicationViews";
import { NavBar } from "./components/NavBar/NavBar";
import { Login } from "./components/Auth/Login";
import { Register } from "./components/Auth/Register";
import "./App.css"
import {Landing} from "./components/Auth/Landing"


export const Wearhouse = () => {

  
return (
  <>
    <Route
      render={() => {
        if (localStorage.getItem("wearhouse_user")) {
          return (
            <>
            <section className="wholePageBackground">
              </section>
              <section className="wholePageContainer">
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