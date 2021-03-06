/* eslint-disable react-hooks/exhaustive-deps */
/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import React, { useContext, useEffect, useState } from "react"
import {Button, CardSubtitle, Card, CardTitle, CardBody } from "reactstrap"
import {TrackingContext} from "./TrackingProvider"
import { InventoryContext } from "../Inventory/InventoryProvider"



export const TrackingDetail = ({searchResult}) => {
  const { getUnshippedInventoryList, unshippedInventory, updateInventory} = useContext(InventoryContext)
  const { addTracking } = useContext(TrackingContext)
  const [unshippedInventoryList, setUnshippedInventory] = useState([])

  // gets inventory items with embeded tracking details
  useEffect(() => {
    getUnshippedInventoryList()
  }, [])

  // gets inventory items that have not yet been shipped
  useEffect(() => {
    const NoShippingYet = (unshippedInventory.filter(item => item.quantity > 0))
    setUnshippedInventory(NoShippingYet)
  }, [unshippedInventory])

  console.log(searchResult)

  // saves tracking info to the DB
  const handleSaveTracking = (item) => {
    addTracking({
      trackingNumber: searchResult.tracking_number,
      carrier: searchResult.carrier_code,
      inventoryItemId: item.id
    })
    updateInventory({
      id: item.id,
      userId: item.userId,
      silhouette: item.silhouette,
      brand: item.brand,
      name: item.name,
      sku: item.sku,
      marketValue: item.marketValue,
      size: item.size,
      quantity: item.quantity - 1,
      price: item.price
    })
    .then(() => {
      localStorage.removeItem("trackingId")
      localStorage.removeItem("trackingNumber")
      localStorage.removeItem("trackingInventory")
      localStorage.removeItem("trackingCarrier")
      localStorage.removeItem("trackingInventoryId")
    })
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
                <CardSubtitle tag="h6" className="mb-2 text-muted">Name: {item.name} <br />
              Size: {item.size} <br />
              Quantity In Stock: {item.quantity}</CardSubtitle>
              <img width="100%" src={item.silhouette} alt="Card cap" />
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
