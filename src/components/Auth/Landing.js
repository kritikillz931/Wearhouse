// Homepage user sees when vising webpage IF not logged in
import React from "react"
import { Button } from 'reactstrap'
import { useHistory } from "react-router-dom"
import WEARHOUSELOGO from "../Images/WEARHOUSELOGO.png"
import "../Auth/Landing.css"

export const Landing = () => {
    const history = useHistory()

    return (
        <main>
            <section>
            <img alt="wearhouse logo" className="Logo" src={WEARHOUSELOGO} />
                <div className="containerLogin" >
                    <Button color="info" onClick={() => history.push("/Login")}>
                        Login
            </Button>
            &nbsp; &nbsp; &nbsp; &nbsp;
                    <Button color="info" onClick={() => history.push("/Register")}>
                        Register
            </Button>
                </div>
            </section>
        </main>
    )
}


