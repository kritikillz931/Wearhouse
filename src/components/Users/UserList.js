import React, { useContext, useEffect } from "react"
import { UserContext } from "./UserProvider"
import { Users } from "../Users/Users"


export const userList = () => {

  const { users, getUsers } = useContext(UserContext)


  useEffect(() => {
    console.log("userList: useEffect - getUsers")
    getUsers()
  }, [])

  return (
    <section className="users">
      {console.log("userList: Render", users)}
      {
        users.map(user => {
          return (
            <Users userProp={user} />
          )
        })
      }
    </section>
  )
}