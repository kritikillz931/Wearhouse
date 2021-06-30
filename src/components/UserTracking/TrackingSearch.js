import React, { useContext, useState } from "react"
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap"
import { TrackingContext } from "./TrackingProvider"
import { TrackingDetail } from "./TrackingDetail"
import "./tracking.css"



export const TrackingSearch = (props) => {
  const { addTracking } = useContext(TrackingContext)
  const {
    className,
    searchResult
  } = props;
  const [modal, setModal] = useState(false);
  const toggleDetails = () => setShowDetails(!showDetails);
  const [showDetails, setShowDetails] = useState(false)


  const userId = parseInt(localStorage.getItem("wearhouse_user"))

  const handleSaveTracking = () => {
    //POST - add
    addTracking({
      userId: userId,
      date: searchResult.date,
      statusDescription: searchResult.statusDescription,
      Location: searchResult.details,
      checkpoint: searchResult.checkpoin_status
    })
    .then(res => localStorage.setItem("trackingId", res.id))
    .then(toggleDetails)
  }

  console.log(searchResult.origin_info.trackinfo)



  return (
    <>
      <section id="apiResults" >
        <p>
          <b>Carrier: </b>{searchResult.carrier_code}<br />
          <b>Tracking Number: </b>{searchResult.tracking_number}<br />
          <b>Status: </b>{searchResult.status}<br />
          <b>Latest Update: </b>{searchResult.status} @ {searchResult.lastUpdateTime}<br /> <br />
          <span id="expandTrackingBtn" onClick={toggleDetails}>{showDetails ? "Hide Tracking Details" : "Show Tracking Details" }</span> <br />
          <br />
            {showDetails ? searchResult.origin_info.trackinfo.map(action => {
              return <p id="shippingDetails">
                <b>Date: </b>{action.Date} <br />
                <b>Status: </b>{action.StatusDescription} <br />
                <b>Details: </b>{action.Details} <br />
                </p>
              })
            : <hr />}<br />
          
          
        </p>
        </section>
        <Button id="apiSave" color="info" className="btn btn-primary" onClick={event => {
          event.preventDefault()
          handleSaveTracking()
        }}>SAVE</Button>
    </>
  )
}
