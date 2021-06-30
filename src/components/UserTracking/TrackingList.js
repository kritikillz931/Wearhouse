import React, { useContext, useEffect, useState } from "react"
import { TrackingContext } from "./TrackingProvider"
import { useHistory } from "react-router-dom"
import { Table, Button, Modal, ModalBody, ModalHeader, ModalFooter, } from 'reactstrap';
import { TrackingInfoForm } from "./TrackingForm";
import { TrackingDetail } from "./TrackingDetail";

export const TrackingList = (props) => {
    const { trackingList, releaseTracking, getTrackingList } = useContext(TrackingContext)
    const {
        className
    } = props;
    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)
    const [filteredTrackingList, setTrackingList] = useState([])
    const [editModal, setEditModal] = useState(false);
    const history = useHistory()
    const userId = parseInt(localStorage.getItem("wearhouse_user"))

    useEffect(() =>{
        getTrackingList()
        localStorage.removeItem("trackingId")
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

    const openEditModal = (id) => {
        localStorage.setItem("trackingId", id)
        setEditModal(true)
        return;
    }

return (
    <>
    <div>
        <section className="TrackingContainer">
          <div >
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
                  <tr key={tracking.id}>
                    <td className="prodInfo">{tracking.carrier}</td>
                    <td className="prodInfo">{tracking.trackingNumber}</td>
                    <td className="prodInfo"><b>{tracking.inventoryItem.brand}</b> <br /> {tracking.inventoryItem.name}</td>
                    <td>
                      <Button  
                        color="info" 
                        size="sm" 
                        onClick={(event) => {
                          event.preventDefault()
                          openEditModal(tracking.id)
                          }}
                        >View / Edit Details
                      </Button> 
                      <span>&#9;</span>
                      <Button color="info" size="sm" onClick={() => handleRelease(tracking.id)}>Delete</Button>
                      
                      </td>
                  </tr>
                )
              })
            }
          </tbody></Table>
          </div>
        </section>
          <div className="totalsContainer">
            <Button className="text-white" trackingNumber="sm" style={{ height: '30px', width: '125px' }} color="info" onClick={toggle} >
              Add New
              </Button>
          </div>
      </div>

      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalBody>
          <TrackingInfoForm onClick={toggle} trackingList={trackingList} />
        </ModalBody>
        <ModalFooter>
          <Button color="info" onClick={toggle}>Cancel</Button>{''}
        </ModalFooter>
      </Modal>

      <Modal id="updateDetailsModal" isOpen={editModal} className={className}>
        <ModalBody>
          <TrackingDetail />
        </ModalBody>
        <ModalFooter>
          <Button color="info" onClick={() => setEditModal(false)}>Cancel</Button>{''}
        </ModalFooter>
      </Modal>
    </>
)
}
