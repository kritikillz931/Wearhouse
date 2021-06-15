import React from "react"


export const Users = ({UserProp}) => (
    <section className="Users">
        <h3 className="Users__name">{UserProp.userName}</h3>
        <div className="Users__address">{UserProp.email}</div>
    </section>
)