/* eslint-disable react-hooks/exhaustive-deps */
/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import React, { useContext, useEffect, useState } from "react"
import { TrackingContext } from "./TrackingProvider"
import { useHistory } from "react-router-dom"
import { Spinner, } from 'reactstrap';
import { TrackingInfoForm } from "./TrackingForm";
import { TrackingDetail } from "./TrackingDetail";
import { InventoryDetail } from "../Inventory/InventoryDetail";

export const TrackingTableRow = ({ tracking }) => {
    const { searchTracking, trackingResults } = useContext(TrackingContext)
    const [trackingStatus, setTrackingStatus] = useState("")
    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)
    const openEditModal = (trackingNumber, trackingCarrier, trackingInventory, trackingId) => {
        localStorage.setItem("trackingNumber", trackingNumber)
        localStorage.setItem("trackingCarrier", trackingCarrier)
        localStorage.setItem("trackingInventory", trackingInventory)
        localStorage.setItem("trackingId", trackingId)
        setModal(true)
        return;
    }

    useEffect(() => {
        searchTracking(tracking.trackingNumber, tracking.carrier)
        console.log(trackingResults)
    }, [])



    return (
        <>
            <tr key={tracking.id} onClick={(event) => {
                event.preventDefault()
                openEditModal(tracking.trackingNumber, tracking.carrier, tracking.inventoryItem, tracking.id)
            }}>
                <td><img className="prodPhoto" src={tracking.inventoryItem.silhouette} alt="shoe" /></td>
                <td className="prodInfo"><b>{tracking.inventoryItem.brand}</b> {tracking.inventoryItem.name}</td>
                <td className="prodInfo">{tracking.carrier}</td>
                <td className="prodInfo">{tracking.trackingNumber}</td>
                <td>
                    {trackingResults.data?.items.length > 0 ? trackingResults.data?.items[0].status: <Spinner size="sm" children=" " color="secondary" />}

                </td>
            </tr>


        </>
    )
}