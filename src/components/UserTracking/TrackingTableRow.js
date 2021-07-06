/* eslint-disable react-hooks/exhaustive-deps */
/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import React, { useContext, useEffect, useState } from "react"
import { TrackingContext } from "./TrackingProvider"
import { ModalHeader, Spinner, Modal, ModalBody, Button, ModalFooter } from 'reactstrap';
import { InventoryContext } from "../Inventory/InventoryProvider";

export const TrackingTableRow = ({ tracking }) => {
    const { searchTracking, trackingResults, releaseTrackingNumber } = useContext(TrackingContext)
    const { updateInventory, getInventoryById } = useContext(InventoryContext)
    const [showTracking, setShowTracking] = useState("")
    const [item, setItem] = useState({})
    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)


    useEffect(() => {
        searchTracking(tracking.trackingNumber, tracking.carrier)
        getInventoryById(tracking.inventoryItemId)
            .then(setItem)
    }, [])


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
                <td><img className="prodPhoto" src={tracking.inventoryItem.silhouette} alt="shoe" /></td>
                <td className="prodInfo"><b>{tracking.inventoryItem.brand}</b> {tracking.inventoryItem.name}</td>
                <td className="prodInfo">{tracking.carrier}</td>
                <td className="prodInfo">{tracking.trackingNumber}</td>
                <td>
                    {trackingResults.data?.items.length > 0 ? trackingResults.data?.items[0].status : <Spinner size="sm" children=" " color="secondary" />}

                </td>
            </tr>


            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader className="ModalCloseBtn" toggle={toggle}>
                    <h2>Tracking Details</h2>
                </ModalHeader>
                <ModalBody>
                    <img src={tracking.inventoryItem.silhouette} alt="shoe" className="modalImage" />
                    <p>Status: {trackingResults?.data?.items[0].status}</p>



                    <p id="expandTrackingBtn" onClick={() => setShowTracking(!showTracking)}>{showTracking ? "Hide Details" : "View Details"}</p>
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
                    <Button color="danger" size="md" onClick={() => deleteShipment()}>Cancel Shipment</Button>
                </ModalFooter>
            </Modal>


        </>
    )
}