import React, { useContext, useEffect, useState, useRef } from "react"
import { Button } from 'reactstrap'
import { useHistory } from "react-router-dom"
import WEARHOUSELOGO from "../Images/WEARHOUSELOGO.png"
import backgroundImg from "../Images/newbg.jpg"
import "../Auth/Landing.css"

export const Landing = () => {
    const [userName, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const existDialog = useRef()
    const history = useHistory()

    useEffect(() => {
        setUsername('')
        setEmail('')
    },[] )

    const existingUserCheck = () => {
        return fetch(`http://localhost:8088/users?email=${email}`)
            .then(res => res.json())
            .then(user => user.length ? user[0] : false)
    }

    const handleLogin = (e) => {
        e.preventDefault()

        existingUserCheck()
            .then(exists => {
                if (exists) {
                    localStorage.setItem("wearhouse_user", exists.id)
                    history.push("/home")
                } else {
                    existDialog.current.showModal()
                }
            })
        }

  
  var sectionStyle = {
    width: "100%",
    height: "937px",
    backgroundImage: `url(${backgroundImg})`
};
    return (
        <main>
            <section style={sectionStyle}>
                <img className="Logo" src={WEARHOUSELOGO} />
                <div className="containerLogin" onSubmit={handleLogin}>
                    <Button color="info" onClick={() => history.push("/Login")}>
                        Login
            </Button>
                    <Button color="info" onClick={() => history.push("/Register")}>
                        Register
            </Button>
                </div>
            </section>
        </main>
    )
}


