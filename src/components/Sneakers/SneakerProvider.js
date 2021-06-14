import React, { useState, createContext } from "react"

export const SneakerContext = createContext()

export const SneakerProvider = (props) => {
    const [sneakers, setSneakers] = useState([])
    
    const getSneakers = () => {
        return fetch("https://the-sneaker-database.p.rapidapi.com/sneakers?limit=10", {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "cacac81cf8msh138d7346646a222p1ee1b0jsnb9b3451c282b",
                "x-rapidapi-host": "the-sneaker-database.p.rapidapi.com"
            }
        })
        .then(res=>res.json())
        .then(setSneakers)
    }
    
    return (
        <SneakerContext.Provider
        value={{
            sneakers,
            getSneakers
        }}>
        {props.children}
    </SneakerContext.Provider>
)
}