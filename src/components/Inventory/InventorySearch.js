import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams, } from 'react-router-dom';
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap"
import { InventoryContext } from "./InventoryProvider"
import { InventoryDetail } from "./InventoryDetail"
import "./Inventory.css"



export const InventorySearch = (props) => {
  const { addInventory, updateInventory } = useContext(InventoryContext)
  const {
    className,
    searchResult
  } = props;
  const [newInventory, setNewInventory] = useState({})
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  //gets searchResult id from url route
  const { inventoryId } = useParams();

  //gives ability to control navigation
  const history = useHistory();
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
    .then(toggle)
  }



  return (
    <>
      <section >
        <p>
          Name: {searchResult.name}<br />
          Brand: {searchResult.brand}<br />
          sku: {searchResult.sku}<br />
          Gender: {searchResult.gender}<br />
          Release Year: {searchResult.releaseYear}<br />
          Colorway: {searchResult.colorway}
        </p>
        <img src={searchResult.image.thumbnail}></img>
        <Button color="info" className="btn btn-primary" onClick={event => {
          event.preventDefault()
          handleSaveInventory()
          // toggle()

        }}>SAVE</Button>
        <hr />
      </section>


      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalBody>
          <InventoryDetail inventory={newInventory} />
        </ModalBody>
        <ModalFooter>
          <Button color="info" onClick={toggle}>Cancel</Button>{''}
        </ModalFooter>
      </Modal>
    </>
  )
}
