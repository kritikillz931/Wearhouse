import React, { useContext, useState } from "react"
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap"
import { InventoryContext } from "./InventoryProvider"
import { InventoryDetail } from "./InventoryDetail"
import "./Inventory.css"



export const InventorySearch = (props) => {
  const { addInventory } = useContext(InventoryContext)
  const {
    className,
    searchResult
  } = props;
  const [modal, setModal] = useState(false);
  const toggleDetails = () => setModal(!modal);


  const userId = parseInt(localStorage.getItem("wearhouse_user"))

  const handleSaveInventory = () => {
    //POST - add
    addInventory({
      userId: userId,
      silhouette: searchResult.image.small,
      brand: searchResult.brand,
      name: searchResult.name,
      marketValue: searchResult.estimatedMarketValue
    })
    .then(res => localStorage.setItem("inventoryId", res.id))
    .then(toggleDetails)
  }



  return (
    <>
      <section id="apiResults" >
        <p>
          Name: {searchResult.name}<br />
          Brand: {searchResult.brand}<br />
          sku: {searchResult.sku}<br />
          Gender: {searchResult.gender}<br />
          Release Year: {searchResult.releaseYear}<br />
          Colorway: {searchResult.colorway}
        </p>
        <img src={searchResult.image.thumbnail}></img>
        </section>
        <Button id="apiSave" color="info" className="btn btn-primary" onClick={event => {
          event.preventDefault()
          handleSaveInventory()
        }}>SAVE</Button>
        


      <Modal isOpen={modal} toggle={toggleDetails} className={className}>
        <ModalBody>
          <InventoryDetail />
        </ModalBody>
        <ModalFooter>
          <Button color="info" onClick={toggleDetails}>Cancel</Button>{''}
        </ModalFooter>
      </Modal>
    </>
  )
}
