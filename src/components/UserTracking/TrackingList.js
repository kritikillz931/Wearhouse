import React, { useContext, useEffect, useState } from "react"
import { TrackingContext } from "./TrackingProvider"
import { useHistory } from "react-router-dom"
import { Table, Button, Modal, ModalBody, ModalHeader, ModalFooter, Container, Jumbotron, } from 'reactstrap';
import { TrackingInfoForm } from "./TrackingForm";
import { TrackingDetail } from "./TrackingDetail";
import { InventoryDetail } from "../Inventory/InventoryDetail";

export const TrackingList = (props) => {
  const { trackingList, releaseTracking, getTrackingList } = useContext(TrackingContext)
  const {
    className
  } = props;
  const [modal, setModal] = useState(false)
  const toggle = () => setModal(!modal)
  const [filteredTrackingList, setTrackingList] = useState([])
  const history = useHistory()
  const userId = parseInt(localStorage.getItem("wearhouse_user"))

  useEffect(() => {
    getTrackingList()
  }, [])

  useEffect(() => {
    let usersTracking = (trackingList.filter(track => track.inventoryItem.userId === userId))
    setTrackingList(usersTracking)
  }, [trackingList])

  const handleRelease = (trackingId) => {
    releaseTracking(trackingId)
      .then(() => {
        history.push("/Tracking")
      })
  }

  const openEditModal = (trackingNumber, trackingCarrier, trackingInventory) => {
    localStorage.setItem("trackingNumber", trackingNumber)
    localStorage.setItem("trackingCarrier", trackingCarrier)
    localStorage.setItem("trackingInventory", trackingInventory)
    setModal(true)
    return;
  }

  return (
    <>
      <div className="TrackingContainer">
        <Container fluid="md">
          <Jumbotron fluid className="text-white" id="inventoryHeader">
            <h1 className="display-5">Inventory Shipped</h1>
          </Jumbotron>
          <div className="InventoryTable" >
            <Table dark>
              <thead>
                <tr>
                  <th>Carrier</th>
                  <th>Tracking Number</th>
                  <th>Product</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  filteredTrackingList.map(tracking => {
                    return (
                      <tr key={tracking.id} onClick={(event) => {
                        event.preventDefault()
                        openEditModal(tracking.trackingNumber, tracking.carrier, tracking.inventoryItem)
                      }}>
                        <td className="prodInfo">{tracking.carrier}</td>
                        <td className="prodInfo">{tracking.trackingNumber}</td>
                        <td className="prodInfo"><b>{tracking.inventoryItem.brand}</b> <br /> {tracking.inventoryItem.name}</td>
                        <td>
                          <Button color="info" size="sm" onClick={() => handleRelease(tracking.id)}>Delete</Button>

                        </td>
                      </tr>
                    )
                  })
                }
              </tbody></Table>
          </div>
          <div className="totalsContainer">
            <Button className="text-white"  size="md" block  color="info" onClick={toggle} >
              ADD NEW
              </Button>
          </div>
      </Container>
      </div>

        <Modal isOpen={modal} toggle={toggle} className={className}>
          <ModalBody>
            <TrackingInfoForm onClick={toggle}  />
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={toggle}>CANCEL</Button>{''}
          </ModalFooter>
        </Modal>

        

      
    </>
)
}
