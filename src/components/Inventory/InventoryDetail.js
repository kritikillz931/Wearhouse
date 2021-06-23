import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams, } from 'react-router-dom';
import {Button } from "reactstrap"
import {InventoryContext} from "./InventoryProvider"


export const InventoryDetail = ({inventory}) => {
  const {addInventory, updateInventory, getInventoryById } = useContext(InventoryContext)
  const [inventoryItem, setInventoryItem] = useState({})
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  //gives ability to control navigation
  const history = useHistory();
  const userId = parseInt(localStorage.getItem("wearhouse_user"))
  
  const inventoryId = parseInt(localStorage.getItem("inventoryId"))
  useEffect(() => {
      getInventoryById(inventoryId)
      .then(setInventoryItem)
  }, [])
  
  const handleInputChange = (event) => {
    console.log(inventoryItem)
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
            id: inventoryItem.id,
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
        .then(() => setModal(false))
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
            <Button color="info" className="btn btn-primary"
            onClick={event => {
              event.preventDefault()
              handleSaveInventory()
              toggle()
              history.push(`/Inventory/`)
            }}>SAVE</Button>
       
          </form> 
    </>
  )
}
