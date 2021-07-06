import React from "react"
import "./Login.css"
import WEARHOUSELOGO from '../Images/WEARHOUSELOGO.png'


export const LogOut = () => {

    localStorage.clear();
        
        return (
            <main>
            <section>
            <img alt="wearhouse logo" className="Logo" src={WEARHOUSELOGO} />
                <div className="containerLogin" >
                <h3>See you again soon!</h3>
                <div>
                    
            </div>
                </div>
            </section>
        </main>
        );
      }