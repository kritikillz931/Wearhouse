import React, { useEffect, useRef, useState } from "react"
import { useHistory } from "react-router-dom"
import "./Login.css"
import backgroundImg from '../Images/newbg.jpg'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import WEARHOUSELOGO from '../Images/WEARHOUSELOGO.png'


export const LogOut = props => {
    const history = useHistory()

    localStorage.clear();
        
        return (
            <main>
            <section>
            <img className="Logo" src={WEARHOUSELOGO} />
                <div className="containerLogin" >
                <h3>See you again soon!</h3>
                <div>
                    
            </div>
                </div>
            </section>
        </main>
        );
      }