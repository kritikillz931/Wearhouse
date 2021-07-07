/* eslint-disable react-hooks/exhaustive-deps */
/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import React, { useContext, useEffect, useState } from "react"
import { TrackingContext } from "./TrackingProvider"
import { ModalHeader, Spinner, Modal, ModalBody, Button, ModalFooter } from 'reactstrap';
import { InventoryContext } from "../Inventory/InventoryProvider";

export const TrackingTableRow = ({ tracking }) => {
    const { getTrackingStatus, trackingSingle, releaseTrackingNumber } = useContext(TrackingContext)
    const { updateInventory, getInventoryById } = useContext(InventoryContext)
    const [status, setStatus] = useState("")
    const [trackingResults, setTrackingResults] = useState([])
    const [showTracking, setShowTracking] = useState("")
    const [item, setItem] = useState({})
    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)
   
    useEffect(() => {
        console.log("t dot num: ", tracking.trackingNumber, "t dot car: ", tracking.carrier)
        getTrackingStatus(tracking.trackingNumber, tracking.carrier)
        .then(result => {
            setTrackingResults(result)
            setStatus(result.data.items[0].status)
        })
        getInventoryById(tracking.inventoryItemId)
            .then(setItem)
    }, [tracking])

    useEffect(() => {
        console.log("status: ", status)
    }, [status])


    const deleteShipment = () => {
        releaseTrackingNumber(tracking.id)
            .then(() => {
                updateInventory({
                    id: item.id,
                    userId: item.userId,
                    silhouette: item.silhouette,
                    brand: item.brand,
                    name: item.name,
                    sku: item.sku,
                    marketValue: item.marketValue,
                    size: item.size,
                    quantity: item.quantity + 1,
                    price: item.price
                })
            })
    }




    return (
        <>
            <tr key={tracking.id} onClick={(event) => {
                event.preventDefault()
                toggle()
            }}>
                <td><img className="prodPhoto" src={item.silhouette} alt="shoe" /></td>
                <td className="prodInfo"><b>{tracking.inventoryItem.brand}</b> {tracking.inventoryItem.name}</td>
                <td className="prodInfo">{tracking.carrier}</td>
                <td className="prodInfo">{tracking.trackingNumber}</td>
                <td> {status === "" ? <Spinner  children=" "  /> : status} </td>
            </tr>


            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader className="ModalCloseBtn" toggle={toggle}>
                    <h2 id="trackingDetailsFont">TRACKING DETAILS</h2>
                </ModalHeader>
                <ModalBody>
                    <img src={tracking.inventoryItem.silhouette} alt="shoe" className="modalImage" />
                    <p>Status: {status}</p>



                    <p id="expandTrackingBtn" onClick={() => setShowTracking(!showTracking)}>{showTracking ? "HIDE DETAILS" : "VIEW DETAILS"}</p>
                    {showTracking ? trackingResults?.data.items[0].origin_info.trackinfo.map(action => {
                        return <p id="shippingDetails">
                            <b>Date: </b>{action.Date} <br />
                            <b>Status: </b>{action.StatusDescription} <br />
                            <b>Details: </b>{action.Details} <br />
                        </p>
                    })
                        : <br />}
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" size="md" onClick={() => deleteShipment()}>CANCEL SHIPMENT</Button>
                </ModalFooter>
            </Modal>


        </>
    )
}