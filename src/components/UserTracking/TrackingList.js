/* eslint-disable react-hooks/exhaustive-deps */
/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import React, { useContext, useEffect, useState } from "react"
import { TrackingContext } from "./TrackingProvider"
import { useHistory } from "react-router-dom"
import { Table, Button, Modal, ModalBody, ModalHeader, ModalFooter, Container, Jumbotron, } from 'reactstrap';
import { TrackingInfoForm } from "./TrackingForm";
import { TrackingDetail } from "./TrackingDetail";
import { InventoryDetail } from "../Inventory/InventoryDetail";
import { TrackingTableRow } from "./TrackingTableRow";

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
                  <th>Silhouette</th>
                  <th>Description</th>
                  <th>Carrier</th>
                  <th>Tracking Number</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {
                  filteredTrackingList.map(tracking => {
                    return (
                      <TrackingTableRow tracking={tracking} />
                    )
                  })
                }
              </tbody></Table>
          </div>
          <div className="totalsContainer">
            <Button className="text-white"  size="sm" block  color="info" onClick={toggle} >
              ADD NEW
              </Button>
          </div>
      </Container>
      </div>

        <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader className="ModalCloseBtn" id="trackingModal" toggle={toggle}>
          <h2 id="trackingFormHeader">Search tracking info</h2>
        </ModalHeader>
          <ModalBody>
            <TrackingInfoForm onClick={toggle}  />
          </ModalBody>
         
        </Modal>

        

      
    </>
)
}
