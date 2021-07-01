import React, { useContext, useEffect, useState } from "react"
import { TrackingContext } from "./TrackingProvider"
import { Button, Form, Input } from "reactstrap"
import { TrackingSearch } from "./TrackingSearch"

export const TrackingInfoForm = ({shoeInfo}) => {
    const {searchTracking, trackingResults } = useContext(TrackingContext)
    const [trackingNumber, setTrackingNumber] = useState("")
    const [trackingCarrier, setTrackingCarrier] = useState("")
    const [results, setResults] = useState([])

    const trackNum = localStorage.getItem("trackingNumber")
    const trackCar = localStorage.getItem("trackingCarrier")
    
    const handleTrackingInputChange = (event) => {
        setTrackingNumber(event.target.value)
        console.log(trackingNumber)
    }
    const handleCarrierInputChange = (event) => {
        setTrackingCarrier(event.target.value)
        console.log(trackingCarrier)
    }
    useEffect(() => {
        setResults([])
    },[])

    useEffect(() => {
        setResults(trackingResults)
        console.log("final results: ", trackingResults.data?.items)
    }, [trackingResults])

    const trackingSearch = () => {
        searchTracking(trackingNumber, trackingCarrier)
    }
    console.log("shoe info made it!!", shoeInfo)

    return (
        <>
        <section id="trackingModal">
            <Form className="trackingForm">
            <h2 id="trackingHeader">Tracking Information</h2>
            <fieldset>
                <Input type="text" id="trackingNumberInput" name="trackingNumber" placeholder="Enter Tracking Number..." defaultValue={trackNum} onChange={handleTrackingInputChange} />
                <Input type="text" id="carrierInput" name="carrier" placeholder="Enter Carrier..." defaultValue={trackCar} onChange={handleCarrierInputChange} />
            </fieldset>
            <Button id="trackingButton" color="info"
            onClick={event => {
                event.preventDefault()
                trackingSearch()
                }}>Search</Button>
            </Form>
        </section>
        <div>

         {results.data?.items.map(singleResult => {
            return <TrackingSearch key={singleResult.id} searchResult={singleResult} shoeInfo={shoeInfo} />
         })}

        </div>
        </>
    )
}




