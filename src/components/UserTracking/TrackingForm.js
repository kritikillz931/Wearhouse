import React, { useContext, useEffect, useState } from "react"
import { TrackingContext } from "./TrackingProvider"
import { Button, Form, Input } from "reactstrap"
import { TrackingSearch } from "./TrackingSearch"

export const TrackingInfoForm = () => {
    const {searchTracking, searchTrackingLocation } = useContext(TrackingContext)
    const [TrackingLocation, setTrackingLocation] = useState("")
    const [trackingCarrierUsed, setTrackingCarrierUsed] = useState("")
    
    const handleTrackingInputChange = (event) => {
        setTrackingLocation(event.target.value)
    }
    const handleCarrierInputChange = (event) => {
        setTrackingCarrierUsed(event.target.value)
    }
    const trackingSearch = () => {
        searchTracking(TrackingLocation, trackingCarrierUsed)
        console.log(TrackingLocation, trackingCarrierUsed)
    }


    return (
        <>
        <section id="trackingModal">
            <Form className="trackingForm">
            <h2 id="trackingHeader">Tracking Information</h2>
            <fieldset>
                <Input type="text" id="trackingNumber" name="trackingNumber" placeholder="Enter Tracking Number..." value={TrackingLocation} onChange={handleTrackingInputChange} />
                <Input type="text" id="carrier" name="carrier" placeholder="Enter Carrier..." value={trackingCarrierUsed} onChange={handleCarrierInputChange} />
            </fieldset>
            <Button id="trackingButton" color="info"
            onClick={event => {
                event.preventDefault()
                trackingSearch()
                }}>Tracking Number & Carrier</Button>
            </Form>
        </section>
        <div>
            {searchTrackingLocation.results?.map(singleResult => {
                return <TrackingSearch key={singleResult.id} searchResult={singleResult} />
            })}
        </div>
        </>
    )
}




