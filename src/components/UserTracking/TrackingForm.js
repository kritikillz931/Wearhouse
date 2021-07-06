/* eslint-disable react-hooks/exhaustive-deps */
/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import React, { useContext, useEffect, useState } from "react"
import { TrackingContext } from "./TrackingProvider"
import { Button, Form, Input, ModalFooter, Spinner, Alert } from "reactstrap"
import { TrackingSearch } from "./TrackingSearch"
import { useHistory } from "react-router"

export const TrackingInfoForm = ({ shoeInfo, trackingInfo }) => {
    const { searchTrackingSingle, trackingSingle, releaseTracking } = useContext(TrackingContext)
    const [trackingNumber, setTrackingNumber] = useState("")
    const [trackingCarrier, setTrackingCarrier] = useState("")
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    useEffect(() => {
        if (trackingInfo) {
            setTrackingNumber(trackingInfo.trackingNumber)
            setTrackingCarrier(trackingInfo.carrier)
        }
    }, [trackingInfo])

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
        console.log("trackingSingle" , trackingSingle)
        setResults(trackingSingle)
    }, [trackingSingle])

    const trackingSearch = () => {
        setLoading(true)
        searchTrackingSingle(trackingNumber.trim(), trackingCarrier.trim())
    }

    return (
        <>
            <section >
                <Form className="trackingForm">
                    <fieldset>
                        <Input type="text" id="trackingNumberInput" name="trackingNumber" placeholder="Enter Tracking Number..." defaultValue={trackingNumber} onChange={handleTrackingInputChange} />
                        <br />
                        <Input type="text" id="carrierInput" name="carrier" placeholder="Enter Carrier..." defaultValue={trackingCarrier} onChange={handleCarrierInputChange} />
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
                        handleRelease(trackingInfo.id)
                        history.push(`/Tracking/`)
                    }}>DELETE</Button> : <Button color="danger" onClick={() => refreshPage()}>CANCEL</Button>}




                </ModalFooter>
            </section>
            <div>
            {results.data.items[0].status === "notfound" ? <Alert color="warning">No Results Found</Alert> : <TrackingSearch key={results.data.items[0].id} searchResult={results.data.items[0]} shoeInfo={shoeInfo} />}

            {loading && !results.data ? <> <Spinner children=" "  type="grow"  color="info" /> <Spinner children=" "  type="grow" color="info" /> <Spinner children=" "  type="grow" color="info" /> </> : ""}

                {/* {results?.data?.items.map(singleResult => {
                    return <TrackingSearch key={singleResult.id} searchResult={singleResult} shoeInfo={shoeInfo} />
                })} */}

            </div>
        </>
    )
}




