import React, { useContext, useEffect, useState } from "react"
import { SneakerContext } from "./sneakerProvider"
import { useParams, useHistory } from "react-router-dom"



export const SneakerDetail = () => {
    // references the fetch calls in sneakerProvider(sneaker data)
    const { sneakers } = useContext(SneakerContext)
    // initializeS the sneaker state
    const [sneaker, setsneaker] = useState({})

    //lets you access the parameters of the current route (sneakerId)
    const { sneakerId } = useParams();

    //Finds the sneaker id that is equal to the sneaker id in useParams
    useEffect(() => {
        const thissneaker = sneakers.find(a => a.id === parseInt(sneakerId)) || { location: {}, customer: {} }
    // sets the sneaker state with current sneaker
        setsneaker(thissneaker)
        // dependency array, will render page each time sneaker id changes
    }, [sneakerId])

    //variable stores the ability to manipulate the url 
    const history = useHistory()

    
    const handleRelease = () => {
    // release sneaker functions takes argument of sneaker id, deletes the sneaker, then history.push navigates user back to sneakers list
        releasesneaker(sneaker.id)
            .then(() => {
                history.push("/sneakers")
            })
    }

    // returns jsx for sneaker details
    return (

        <section className="sneaker">
            <h3 className="sneaker__name">{sneaker.name}</h3>
            <div className="sneaker__breed">{sneaker.breed}</div>
            <div className="sneaker__location">Location: {sneaker.location.name}</div>
            <div className="sneaker__owner">Customer: {sneaker.customer.name}</div>
            <button onClick={handleRelease}>Release sneaker</button>
            <button onClick={() => {
                history.push(`/sneakers/details/edit/${sneaker.id}`)
            }}>Edit</button>
        </section>
    )

}