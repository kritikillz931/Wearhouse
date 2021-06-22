import React, { useEffect, useRef, useState } from "react"
import { useHistory } from "react-router-dom"
import "./Register.css"
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import backgroundImg from '../Images/newbg.jpg'

export const Register = (props) => {
    const [userName, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const conflictDialog = useRef()
    const history = useHistory()

    useEffect(() => {
        setUsername('')
        setEmail('')
    },[] )

    const existingUserCheck = () => {
        return fetch(`http://localhost:8088/users?email=${email}`)
            .then(res => res.json())
            .then(user => !!user.length)
    }

    const handleRegister = (e) => {
        existingUserCheck()
            .then((userExists) => {
                if (!userExists) {
                    fetch("http://localhost:8088/users", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            email: email,
                            userName: userName
                        })
                    })
                        .then(res => res.json())
                        .then(createdUser => {
                            if (createdUser.hasOwnProperty("id")) {
                                localStorage.setItem("wearhouse_user", createdUser.id)
                                history.push("/")
                            }
                        })
                }
                else {
                    conflictDialog.current.showModal()
                }
            })

    }
    var sectionStyle = {
        width: "100%",
        height: "937px",
        backgroundImage: `url(${backgroundImg})`
    };

    return (
        <main style={sectionStyle}>

            <dialog className="dialog dialog--password" ref={conflictDialog}>
                <div>Account with that email address already exists</div>
                <button className="button--close" onClick={e => conflictDialog.current.close()}>Close</button>
            </dialog>

            <Form className="RegisterForm" >
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Label className="text-white" for="exampleEmail" className="mr-sm-2"><p className="text-white">Email</p></Label>
                    <Input type="email" name="email" id="exampleEmail" placeholder="YourEmail@here.com" onChange={e=> setEmail(e.target.value)}/>
                </FormGroup>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Label for="examplePassword" className="mr-sm-2"><p className="text-white">Username</p></Label>
                    <Input  type="text" name="userName" id="exampleUsername" placeholder="Pick Something Cool" onChange={e=> setUsername(e.target.value)}/>
                </FormGroup>
                <Button 
                    type="submit" 
                    color="info"
                    onClick={(e) => {
                        e.preventDefault()
                        handleRegister()
                    }
                    }
                    >Register</Button>
            </Form>
        </main>
    )
}

