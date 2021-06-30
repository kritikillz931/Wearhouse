import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams, } from 'react-router-dom';
import {Button, Input } from "reactstrap"
import {TrackingContext} from "./TrackingProvider"
import { InventoryContext } from "../Inventory/InventoryProvider"



export const TrackingDetail = ({searchResult}) => {
  const { getInventoryList, inventoryList } = useContext(InventoryContext)
  const { addTracking, updateTrackingInfo } = useContext(TrackingContext)

  useEffect(() => {
    getInventoryList()
  }, [searchResult])

  const handleSaveTracking = (item) => {
    //POST - add
    addTracking({
      trackingNumber: searchResult.tracking_number,
      carrier: searchResult.carrier_code,
      inventoryItemId: item.id
    })
    .then(res => localStorage.setItem("trackingId", res.id))
    .then(window.location.reload())
  }

  return (
    <>
    <b>Which item is being shipped?</b>
          {inventoryList.map(item => {
            return <>
            <div>
              Brand: {item.brand}
              Name: {item.name}
              Size: {item.size}
              <button  
                onClick={(e) => {
                e.preventDefault()
                handleSaveTracking(item)
                }
                }
              > Select </button>
              </div>
            </>
          })}
    </>
  )
}
