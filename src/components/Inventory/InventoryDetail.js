import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams, } from 'react-router-dom';
import {Button } from "reactstrap"
import {InventoryContext} from "./InventoryProvider"


export const InventoryDetail = () => {
  const {addInventory, updateInventory, getInventoryById } = useContext(InventoryContext)
  const [inventoryItem, setInventoryItem] = useState({})
 
  //gets searchResult id from url route
  const {inventoryId} = useParams();

  //gives ability to control navigation
  const history = useHistory();
  const userId = parseInt(localStorage.getItem("wearhouse_user"))

  useEffect(() => {
    getInventoryById(inventoryId)
    .then(setInventoryItem)
  }, [])
  
  const handleInputChange = (event) => {
    const newInventory = { ...inventoryItem }
    newInventory[event.target.name] = event.target.value
    setInventoryItem(newInventory)
    console.log(inventoryItem)
  }



    const handleSaveInventory = () => {
        let mktVal ;
        if (inventoryItem.marketValue === 0 ) {
            mktVal = "N/A"
        } else {
            mktVal = inventoryItem.marketValue
        }
        console.log(inventoryItem)
        //PUT - update
        updateInventory(
            {
            id: inventoryId,
            userId: userId,
            silhouette: inventoryItem.silhouette,
            brand: inventoryItem.brand,
            name: inventoryItem.name,
            sku: inventoryItem.sku,
            marketValue: mktVal,
            size: inventoryItem.size,
            quantity: inventoryItem.quantity,
            price: inventoryItem.price
        })
        .then(() => history.push(`/Inventory`))
        
      }

  return (
    <>
    <h3>Update Details</h3>
    <form className="inventoryForm">
            
            <fieldset>
              <input type="text" id="inventory__quantity" name="quantity" placeholder="Add Quantity" defaultValue={inventoryItem.quantity} onChange={handleInputChange} />
              <input type="text" id="inventory__size" name="size" placeholder="Add Size" defaultValue={inventoryItem.size} onChange={handleInputChange} />
              <input type="text" id="inventory__pricePaid" name="price" placeholder="Add Price Paid" defaultValue={inventoryItem.price} onChange={handleInputChange} />
            </fieldset>
            <button className="btn btn-primary"
            onClick={event => {
              event.preventDefault()
              handleSaveInventory()
            }}>Save</button>
       
          </form> 
    </>
  )
}
