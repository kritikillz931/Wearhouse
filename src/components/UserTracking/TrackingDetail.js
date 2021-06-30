import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams, } from 'react-router-dom';
import {Button, CardSubtitle, Input, Card, CardTitle, CardBody } from "reactstrap"
import {TrackingContext} from "./TrackingProvider"
import { InventoryContext } from "../Inventory/InventoryProvider"



export const TrackingDetail = ({searchResult}) => {
  const { getUnshippedInventoryList, unshippedInventory} = useContext(InventoryContext)
  const { addTracking, updateTrackingInfo } = useContext(TrackingContext)
  const [unshippedInventoryList, setUnshippedInventory] = useState([])

  // gets inventory items with embeded tracking details
  useEffect(() => {
    getUnshippedInventoryList()
  }, [])

  // gets inventory items that have not yet been shipped
  useEffect(() => {
    const NoShippingYet = (unshippedInventory.filter(item => item.trackingDetails.length < 1))
    setUnshippedInventory(NoShippingYet)
  }, [unshippedInventory])


  // saves tracking info to the DB
  const handleSaveTracking = (item) => {
    addTracking({
      trackingNumber: searchResult.tracking_number,
      carrier: searchResult.carrier_code,
      inventoryItemId: item.id
    })
    .then(res => localStorage.setItem("trackingId", res.id))
    .then(window.location.reload())
  }


  // html render 
  return (
    <>
    <b>Which item is being shipped?</b>
          {unshippedInventoryList?.map(item => {
            return <>
            <Card body>
              <CardBody>
                <CardTitle tag="h3">Brand: {item.brand}</CardTitle>
                <CardSubtitle tag="h6" className="mb-2 text-muted">Name: {item.name}
              Size: {item.size}</CardSubtitle>
              <img width="100%" src={item.silhouette} alt="Card image cap" />
              </CardBody>
        <Button  color="info" size="sm"
                onClick={(e) => {
                e.preventDefault()
                handleSaveTracking(item)
                }
                }
              > Select </Button>
              
              
              
              </Card>
            </>
          })}
    </>
  )
}
