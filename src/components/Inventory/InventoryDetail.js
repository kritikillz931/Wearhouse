import React, { useContext, useEffect, useState } from "react"
import { useHistory } from 'react-router-dom';
import { Modal, Button, Input, InputGroup, InputGroupAddon, InputGroupText, ModalFooter } from "reactstrap"
import { InventoryContext } from "./InventoryProvider"
import "./Inventory.css"
import {TrackingContext} from "../UserTracking/TrackingProvider"

export const InventoryDetail = (props) => {
  const { updateInventory, getInventoryById, releaseInventory } = useContext(InventoryContext)
  const {searchTracking, trackingResults } = useContext(TrackingContext)
  const [inventoryItem, setInventoryItem] = useState({})
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const toggleDetails = () => setShowTracking(!showTracking)
  const [showTracking, setShowTracking] = useState(false)
  const history = useHistory();
  const userId = parseInt(localStorage.getItem("wearhouse_user"))
  const {
    className
  } = props;
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

  const refreshPage = () => {
    window.location.reload()
  }

  const handleSaveInventory = () => {
    let mktVal;
    if (inventoryItem.marketValue === 0) {
      mktVal = inventoryItem.price
    } else {
      mktVal = inventoryItem.marketValue
    }

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

          {/* <Button onClick={toggle}>Add Tracking Info</Button> */}

          {inventoryItem.size ? <Button color="danger" className="inventoryDeleteBtn"
            onClick={event => {
              event.preventDefault()
              handleRelease(inventoryItem.id)
              toggle()
              history.push(`/Inventory/`)
            }}>Delete</Button> : <Button color="danger" onClick={() => refreshPage()}>Cancel</Button>}


        </ModalFooter>
        {/* <ModalBody>
          <span id="expandTrackingBtn" onClick={toggleDetails}>{showTracking ? "Hide Tracking Details" : "Show Tracking Details"}</span>
          {showTracking ? inventoryItem.trackingDetails?.map((trackInfo) => {
            return <>
              <InventoryTracker info={trackInfo} />
            </>
                      }
          ) : <hr />}
        </ModalBody> */}
      </section>





      <Modal isOpen={modal} toggle={toggle} className={className}>
          {/* <ModalBody>
            <TrackingInfoForm onClick={toggle}  shoeInfo={inventoryItem}/>
          </ModalBody> */}
          <ModalFooter>
            <Button color="secondary" onClick={toggle}>Cancel</Button>{''}
          </ModalFooter>
        </Modal>
    </>
  )
}
