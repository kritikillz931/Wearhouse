import React, { useEffect, useRef, useState } from "react"
import { useHistory } from "react-router-dom"
import "./Login.css"
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';



export const Login = () => {
    const [email, setEmail] = useState('')
    const existDialog = useRef()
    const history = useHistory()

    useEffect(() => {
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
                    history.push("/Reminders")
                } else {
                    existDialog.current.showModal()
                }
            })
        }
        
        return (
            <>
            <section className="loginContainer">
                <dialog className="dialog dialog--password" ref={existDialog}>
                <div>Incorrect Login Information</div>
                <button className="button--close" onClick={e => existDialog.current.close()}>Close</button>
            </dialog>
                            
            <Form className="LoginForm" onSubmit={handleLogin} inline>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Label className="text-white mr-sm-2" for="exampleEmail" ><p className="text-white">Email</p></Label>
              <Input type="email" name="email" id="exampleEmail" placeholder="YourEmail@here.com" onChange={e=> setEmail(e.target.value)} />
            </FormGroup>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Label  for="examplePassword" className="mr-sm-2"><p className="text-white">Username</p></Label>
              <Input type="text" name="password" id="exampleUsername" placeholder="Your Username"  />
            </FormGroup>
            <Button type="submit" color="info">Login</Button>
          </Form>
        </section>
        </>
        );
      }