import React, { useRef } from "react"
import { useHistory } from "react-router-dom"
import "./Login.css"
import { Button } from 'reactstrap';
import backgroundImg from '../Images/SNEAKERS.jpg'
import WEARHOUSELOGO from "../Images/WEARHOUSELOGO.png"

export const Login = props => {
    const email = useRef()
    const existDialog = useRef()
    const history = useHistory()

    const existingUserCheck = () => {
        return fetch(`http://localhost:8088/users?email=${email.current.value}`)
            .then(res => res.json())
            .then(user => user.length ? user[0] : false)
    }

    const handleLogin = (e) => {
        e.preventDefault()

        existingUserCheck()
            .then(exists => {
                if (exists) {
                    localStorage.setItem("wearhouse_user", exists.id)
                    history.push("/")
                } else {
                    existDialog.current.showModal()
                }
            })
    }

    // style for background image on login page
    var sectionStyle = {
        width: "100%",
        height: "937px",
        backgroundImage: `url(${backgroundImg})`
    };

    return (
        <main>
            
            <section style={sectionStyle}>
                ``
            </section>
        </main>
    )
}

