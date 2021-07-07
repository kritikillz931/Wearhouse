/* eslint-disable react-hooks/exhaustive-deps */
/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import React, { useContext, useEffect, useState } from "react"
import { useHistory } from 'react-router-dom';
import { Button, Input, InputGroup, InputGroupAddon, InputGroupText, ModalFooter } from "reactstrap"
import { InventoryContext } from "./InventoryProvider"
import "./Inventory.css"

export const InventoryDetail = ({databaseItem, inventoryId}) => {
  const { updateInventory, getInventoryById, releaseInventory, addInventory } = useContext(InventoryContext)
  const [inventoryItem, setInventoryItem] = useState({})
  const history = useHistory();
  const userId = parseInt(localStorage.getItem("wearhouse_user"))
  
  
  useEffect(() => {
    console.log(databaseItem)
    if (inventoryId) {
      getInventoryById(inventoryId)
        .then(setInventoryItem)
    } 
  }, [])


  const handleInputChange = (event) => {
    const newInventory = { ...inventoryItem }
    newInventory[event.target.name] = event.target.value
    setInventoryItem(newInventory)
    console.log(inventoryItem)
  }

  const refreshPage = () => {
    window.location.reload()
  }

  const handleSaveInventory = () => {
    let quantity;
    if (!inventoryItem.quantity) {
      quantity = 1
    } else {
      quantity = inventoryItem.quantity
    }
    let size;
    if (!inventoryItem.size) {
      size = 0
    } else {
      size = inventoryItem.size
    }
    let price;
    if (!inventoryItem.price) {
      price = 0
    } else {
      price = inventoryItem.price
    } 
    let mktVal;
    if (inventoryId) {
      if (inventoryItem.marketValue === 0) {
        mktVal = inventoryItem.price
      } else {
        mktVal = inventoryItem.marketValue
      }
      updateInventory(
        {
          id: inventoryItem.id,
          userId: userId,
          silhouette: inventoryItem.silhouette,
          brand: inventoryItem.brand,
          name: inventoryItem.name,
          sku: inventoryItem.sku,
          marketValue: mktVal,
          size: size,
          quantity: quantity,
          price: price
        })
        .then(window.location.reload())
    } else {
      if (databaseItem.estimatedMarketValue === 0) {
        mktVal = inventoryItem.price
      } else {
        mktVal = databaseItem.estimatedMarketValue
      }
      addInventory({
        userId: userId,
        silhouette: databaseItem.image.thumbnail,
        brand: databaseItem.brand,
        name: databaseItem.name,
        sku: databaseItem.sku,
        marketValue: mktVal,
        size: size,
        quantity: quantity,
        price: price
      })
      .then(window.location.reload())
    }
  }

  const handleRelease = (inventoryId) => {
    releaseInventory(inventoryId)
      .then(window.location.reload())
  }

   return (
     <>
       <section id="newInvDetailsBtn">
         {inventoryId ? <img className="shoeDetailsImage" src={inventoryItem.silhouette} alt="shoe" /> : <img className="shoeDetailsImage" src={databaseItem.image.thumbnail} alt="shoe" />}
         <InputGroup >
           <InputGroupAddon addonType="prepend">
             <InputGroupText>Quantity</InputGroupText>
           </InputGroupAddon>
           <Input name="quantity" placeholder="Add Quantity" defaultValue={inventoryItem.quantity} onChange={handleInputChange} />
         </InputGroup>
         <br />
         <InputGroup>
           <InputGroupAddon addonType="prepend">
             <InputGroupText>Size</InputGroupText>
           </InputGroupAddon>
           <Input type="text" id="inventory__size" name="size" placeholder="Add Size" defaultValue={inventoryItem.size} onChange={handleInputChange} />
         </InputGroup>
         <br />
         <InputGroup>
           <InputGroupAddon addonType="prepend">
             <InputGroupText>Price Paid</InputGroupText>
           </InputGroupAddon>
           <Input type="text" id="inventory__pricePaid" name="price" placeholder="Add Price Paid" defaultValue={inventoryItem.price} onChange={handleInputChange} />
         </InputGroup>
         <br />
         <ModalFooter>
           <Button size="sm" color="info" className="btn btn-primary"
             onClick={event => {
               event.preventDefault()
               handleSaveInventory()
               history.push(`/Inventory/`)
             }}>SAVE</Button>
 
           {inventoryItem.size ? <Button size="sm" color="danger" className="inventoryDeleteBtn"
             onClick={event => {
               event.preventDefault()
               handleRelease(inventoryItem.id)
               history.push(`/Inventory/`)
             }}>DELETE</Button> : <Button color="danger" onClick={() => refreshPage()}>CANCEL</Button>}
 
 
         </ModalFooter>
       </section>
     </>
   )
}
