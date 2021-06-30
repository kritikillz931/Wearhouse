import React, { useContext, useEffect, useState } from "react"
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap"
import { TrackingContext } from "./TrackingProvider"
import { TrackingDetail } from "./TrackingDetail"
import "./tracking.css"
import { InventoryContext } from "../Inventory/InventoryProvider"



export const TrackingSearch = (props) => {
  const { updateInventory} = useContext(InventoryContext)
  const { addTracking } = useContext(TrackingContext)
  
  const [currentTracking, setCurrentTracking] = useState({})
  const {
    className,
    searchResult,
    shoeInfo
  } = props;
  const [modal, setModal] = useState(false);
  const toggleDetails = () => setShowDetails(!showDetails);
  const [showDetails, setShowDetails] = useState(false)
  const toggleModal = () => setModal(!modal)


  const moveToNextStep = () => {
    if(shoeInfo) {
      addTracking({
        trackingNumber: searchResult.tracking_number,
        carrier: searchResult.carrier_code,
        inventoryItemId: shoeInfo.id
      })
      updateInventory({
        id: shoeInfo.id,
        userId: shoeInfo.userId,
        silhouette: shoeInfo.silhouette,
        brand: shoeInfo.brand,
        name: shoeInfo.name,
        sku: shoeInfo.sku,
        marketValue: shoeInfo.marketValue,
        size: shoeInfo.size,
        quantity: shoeInfo.quantity - 1,
        price: shoeInfo.price
      })
      window.location.reload()
    } else {

      toggleModal()
    }
  }


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
          moveToNextStep()
        }}>SAVE</Button>



      <Modal isOpen={modal} toggle={toggleModal} className={className}>
        <ModalBody>
          <TrackingDetail searchResult={searchResult} />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleModal}>Cancel</Button>{''}
        </ModalFooter>
      </Modal>
    </>
  )
}
