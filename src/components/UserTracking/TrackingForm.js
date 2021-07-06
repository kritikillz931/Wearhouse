/* eslint-disable react-hooks/exhaustive-deps */
/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import React, { useContext, useEffect, useState } from "react"
import { TrackingContext } from "./TrackingProvider"
import { Button, Form, Input, ModalFooter } from "reactstrap"
import { TrackingSearch } from "./TrackingSearch"
import { useHistory } from "react-router"

export const TrackingInfoForm = ({ shoeInfo }) => {
    const { searchTracking, trackingResults, releaseTracking } = useContext(TrackingContext)
    const [trackingNumber, setTrackingNumber] = useState("")
    const [trackingCarrier, setTrackingCarrier] = useState("")
    const [results, setResults] = useState([])
    const history = useHistory()

    const trackNum = localStorage.getItem("trackingNumber")
    const trackCar = localStorage.getItem("trackingCarrier")
    const trackId = localStorage.getItem("trackingId")

    const handleTrackingInputChange = (event) => {
        setTrackingNumber(event.target.value)
        console.log(trackingNumber)
    }
    const refreshPage = () => {
        window.location.reload()
      }
    const handleCarrierInputChange = (event) => {
        setTrackingCarrier(event.target.value)
        console.log(trackingCarrier)
    }

    const handleRelease = (id) => {
        releaseTracking(id)
          .then(() => {
            history.push("/Tracking")
          })
      }


    useEffect(() => {
        setResults([])
    }, [])

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
            <section >
                <Form className="trackingForm">
                    <fieldset>
                        <Input type="text" id="trackingNumberInput" name="trackingNumber" placeholder="Enter Tracking Number..." defaultValue={trackNum} onChange={handleTrackingInputChange} />
                        <br />
                        <Input type="text" id="carrierInput" name="carrier" placeholder="Enter Carrier..." defaultValue={trackCar} onChange={handleCarrierInputChange} />
                        <br />
                    </fieldset>
                </Form>
                <ModalFooter>
                    <Button id="trackingButton" color="info"
                        onClick={event => {
                            event.preventDefault()
                            trackingSearch()
                        }}>Search</Button>

                    {shoeInfo ? <Button color="danger" className="inventoryDeleteBtn"
                        onClick={event => {
                        event.preventDefault()
                        handleRelease(trackId)
                        history.push(`/Tracking/`)
                    }}>DELETE</Button> : <Button color="danger" onClick={() => refreshPage()}>CANCEL</Button>}




                </ModalFooter>
            </section>
            <div>

                {results.data?.items.map(singleResult => {
                    return <TrackingSearch key={singleResult.id} searchResult={singleResult} shoeInfo={shoeInfo} />
                })}

            </div>
        </>
    )
}




