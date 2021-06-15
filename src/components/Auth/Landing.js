import React from 'react'
import { Button } from 'reactstrap'
import { useHistory } from "react-router-dom"
import WEARHOUSELOGO from "../Images/WEARHOUSELOGO.png"
import backgroundImg from "../Images/SNEAKERS.jpg"
import "../Auth/Landing.css"

export const Landing = () => {
    const history = useHistory()
    // style for background image on login page
  var sectionStyle = {
    width: "100%",
    height: "937px",
    backgroundImage: `url(${backgroundImg})`
};
    return (
        <main>
            <section style={sectionStyle}>
                <img className="Logo" src={WEARHOUSELOGO} />
                <div className="containerLogin">
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


