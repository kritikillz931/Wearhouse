import React, { useRef } from "react"
import { useHistory, Link } from "react-router-dom"


export const Register = (props) => {
    const userName = useRef()

    const email = useRef()

    const conflictDialog = useRef()
    const history = useHistory()

    const existingUserCheck = () => {
        return fetch(`http://localhost:8088/users?email=${email.current.value}`)
            .then(res => res.json())
            .then(user => !!user.length)
    }

    const handleRegister = (e) => {
        e.preventDefault()


        existingUserCheck()
            .then((userExists) => {
                if (!userExists) {
                    fetch("http://localhost:8088/users", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            email: email.current.value,
                            name: `${userName.current.value}`
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

    return (
        <main className="Register" style={{ textAlign: "center" }}>

            {/* <dialog className="warning" ref={conflictDialog}>
                <div>Account with that email address already exists</div>
                <button className="button--close" onClick={e => conflictDialog.current.close()}>Close</button>
            </dialog>

            <form className="form--login" onSubmit={(e) =>handleRegister(e)}>
                <h1 className="registerHeader">CREATE AN ACCOUNT</h1>
                <div>
                    <label htmlFor="firstName"> Username </label>
                    <input ref={userName} type="text" name="userName" className="form-control" placeholder="User Name" required autoFocus />
                </div>
                <div>
                    <label htmlFor="inputEmail"> Email address </label>
                    <input ref={email} type="email" name="email" className="form-control" placeholder="Email address" required />
                </div>
                <div>
                    <button type="submit"> Create </button>
                    <Link to="/Login"><button type="submit"> Cancel </button></Link>
                </div>
            </form> */}
        </main>
    )
}

