import React, { useContext, useEffect, useState } from "react"
import { TrackingContext } from "./TrackingProvider"
import { Button, Form, Input } from "reactstrap"
import { TrackingSearch } from "./TrackingSearch"

export const TrackingInfoForm = () => {
    const {searchTracking, trackingResults } = useContext(TrackingContext)
    const [trackingNumber, setTrackingNumber] = useState("")
    const [trackingCarrier, setTrackingCarrier] = useState("")
    const [results, setResults] = useState({})

    
    const handleTrackingInputChange = (event) => {
        setTrackingNumber(event.target.value)
        console.log(trackingNumber)
    }
    const handleCarrierInputChange = (event) => {
        setTrackingCarrier(event.target.value)
        console.log(trackingCarrier)
    }
    useEffect(() => {
        setResults(trackingResults)
        console.log("final results: ", trackingResults.data?.items)
    }, [trackingResults])

    const trackingSearch = () => {
        console.log("tracking number: ", trackingNumber)
        console.log("carrier: ", trackingCarrier)
        searchTracking(trackingNumber, trackingCarrier)
        console.log("results: ", trackingResults)
    }


    return (
        <>
        <section id="trackingModal">
            <Form className="trackingForm">
            <h2 id="trackingHeader">Tracking Information</h2>
            <fieldset>
                <Input type="text" id="trackingNumber" name="trackingNumber" placeholder="Enter Tracking Number..." value={trackingNumber} onChange={handleTrackingInputChange} />
                <Input type="text" id="carrier" name="carrier" placeholder="Enter Carrier..." value={trackingCarrier} onChange={handleCarrierInputChange} />
            </fieldset>
            <Button id="trackingButton" color="info"
            onClick={event => {
                event.preventDefault()
                trackingSearch()
                }}>Tracking Number & Carrier</Button>
            </Form>
        </section>
        <div>

         {trackingResults.data?.items.map(singleResult => {
            return <TrackingSearch key={singleResult.id} searchResult={singleResult} />
         })}

        </div>
        </>
    )
}




