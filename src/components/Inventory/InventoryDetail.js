import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams, } from 'react-router-dom';
import { Button, Input, InputGroup, InputGroupAddon, InputGroupText, ModalFooter } from "reactstrap"
import { InventoryContext } from "./InventoryProvider"
import "./Inventory.css"


export const InventoryDetail = () => {
  const { updateInventory, getInventoryById, releaseInventory } = useContext(InventoryContext)
  const [inventoryItem, setInventoryItem] = useState({})
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const history = useHistory();
  const userId = parseInt(localStorage.getItem("wearhouse_user"))

  const inventoryId = parseInt(localStorage.getItem("inventoryId"))
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
    let mktVal;
    if (inventoryItem.marketValue === 0) {
      mktVal = inventoryItem.price
    } else {
      mktVal = inventoryItem.marketValue
    }
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
      .then(window.location.reload())
  }

  const handleRelease = (inventoryId) => {
    releaseInventory(inventoryId)
      .then(window.location.reload())
  }

  return (
    <>
      <section id="newInvDetailsBtn">
        <img className="shoeDetailsImage" src={inventoryItem.silhouette} alt="shoe image" />
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
        <Button color="info" className="btn btn-primary"
          onClick={event => {
            event.preventDefault()
            handleSaveInventory()
            toggle()
            history.push(`/Inventory/`)
          }}>SAVE</Button>

        <Button color="secondary" className="inventoryDeleteBtn"
          onClick={event => {
            event.preventDefault()
            handleRelease(inventoryItem.id)
            toggle()
            history.push(`/Inventory/`)
          }}>Delete</Button>
</ModalFooter>



        {/* <form className="inventoryForm">
            <fieldset id="newInvDetailsInputs">
              <Input size="lg" type="text" id="inventory__quantity" name="quantity" placeholder="Add Quantity" defaultValue={inventoryItem.quantity} onChange={handleInputChange} />
              <Input size="lg" type="text" id="inventory__size" name="size" placeholder="Add Size" defaultValue={inventoryItem.size} onChange={handleInputChange} />
              <Input size="lg" type="text" id="inventory__pricePaid" name="price" placeholder="Add Price Paid" defaultValue={inventoryItem.price} onChange={handleInputChange} />
            </fieldset>
            <Button color="info" className="btn btn-primary"
            onClick={event => {
              event.preventDefault()
              handleSaveInventory()
              toggle()
              history.push(`/Inventory/`)
            }}>SAVE</Button>
          </form>  */}
      </section>
    </>
  )
}
