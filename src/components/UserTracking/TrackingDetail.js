import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams, } from 'react-router-dom';
import {Button, Input } from "reactstrap"
import {TrackingContext} from "./TrackingProvider"



export const TrackingDetail = () => {
  const { updateTracking, getTrackingById } = useContext(TrackingContext)
  const [TrackingDetail, setTrackingDetail] = useState({})
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const history = useHistory();
  const userId = parseInt(localStorage.getItem("wearhouse_user"))
  
  const trackingId = parseInt(localStorage.getItem("trackingId"))
  useEffect(() => {
      getTrackingById(trackingId)
      .then(setTrackingDetail)
  }, [])
  
  const handleInputChange = (event) => {
    const newTracking = { ...TrackingDetail }
    newTracking[event.target.name] = event.target.value
    setTrackingDetail(newTracking)
    console.log(TrackingDetail)
  }

    const handleSaveTracking = () => {
        //PUT - update
        updateTracking(
            {
            id: TrackingDetail.id,
            userId: userId,
            dateShipped: TrackingDetail.dateShipped,
            Carrier: TrackingDetail.carrier,
            trackingNumber: TrackingDetail.trackingNumber,
            products: TrackingDetail.products,
            packageInformation: TrackingDetail.packageInformation,
        })
        .then(window.location.reload())
        console.log(handleSaveTracking)
      }

  return (
    <>
    <section id="newInvDetailsBtn">

    <h3 id="newInvDetailsHeader">Update Details</h3>
    <form className="inventoryForm">
            <fieldset id="newInvDetailsInputs">
              <Input size="lg" type="text" id="inventory__quantity" name="quantity" placeholder="Add Quantity" defaultValue={TrackingDetail.details} onChange={handleInputChange} />
              <Input size="lg" type="text" id="inventory__size" name="size" placeholder="Add Size" defaultValue={TrackingDetail.size} onChange={handleInputChange} />
              <Input size="lg" type="text" id="inventory__pricePaid" name="price" placeholder="Add Price Paid" defaultValue={TrackingDetail.price} onChange={handleInputChange} />
            </fieldset>
            <Button color="info" className="btn btn-primary"
            onClick={event => {
              event.preventDefault()
              handleSaveTracking()
              toggle()
              history.push(`/Tracking/`)
            }}>SAVE</Button>
          </form> 
            </section>
    </>
  )
}
