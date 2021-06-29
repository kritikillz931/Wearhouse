import React, { useContext, useState } from "react"
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap"
import { TrackingContext } from "./TrackingProvider"
import { TrackingDetail } from "./TrackingDetail"




export const TrackingSearch = (props) => {
  const { addTracking } = useContext(TrackingContext)
  const {
    className,
    searchResult
  } = props;
  const [modal, setModal] = useState(false);
  const toggleDetails = () => setModal(!modal);


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



  return (
    <>
      <section id="apiResults" >
        <p>
          Name: {searchResult.date}<br />
          Brand: {searchResult.statusDescription}<br />
          sku: {searchResult.details}<br />
          Gender: {searchResult.checkpoin_status}<br />
          Release Year: {searchResult.releaseYear}<br />
          Colorway: {searchResult.colorway}
        </p>
        </section>
        <Button id="apiSave" color="info" className="btn btn-primary" onClick={event => {
          event.preventDefault()
          handleSaveTracking()
        }}>SAVE</Button>
        


      <Modal isOpen={modal} toggle={toggleDetails} className={className}>
        <ModalBody>
          <TrackingDetail />
        </ModalBody>
        <ModalFooter>
          <Button color="info" onClick={toggleDetails}>Cancel</Button>{''}
        </ModalFooter>
      </Modal>
    </>
  )
}
