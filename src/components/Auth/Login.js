import React, { useRef } from "react"
import { useHistory } from "react-router-dom"
import "./Login.css"
import backgroundImg from '../Images/SNEAKERS.jpg'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';


export const Login = props => {
    const userName = useRef()
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
            <section style={sectionStyle} className="loginContainer">
                            <dialog className="dialog dialog--auth" ref={existDialog}>
                <div>User does not exist</div>
                <button className="button--close" onClick={e => existDialog.current.close()}>Close</button>
            </dialog>
            <Form className="LoginForm" onSubmit={handleLogin} inline>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Label className="text-white" for="exampleEmail" className="mr-sm-2"><p className="text-white">Email</p></Label>
              <Input type="email" name="email" id="exampleEmail" placeholder="YourEmail@here.com" />
            </FormGroup>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Label  for="examplePassword" className="mr-sm-2"><p className="text-white">Username</p></Label>
              <Input type="text" name="password" id="exampleUsername" placeholder="Your Username" />
            </FormGroup>
            <Button color="info">Login</Button>
          </Form>
        </section>
        );
      }