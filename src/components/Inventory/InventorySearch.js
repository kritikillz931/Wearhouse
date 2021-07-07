import React, { useState } from "react"
import { Button, Card, CardSubtitle, CardText, Modal, ModalBody, ModalHeader, CardBody, CardTitle } from "reactstrap"
import { InventoryDetail } from "./InventoryDetail"
import "./Inventory.css"



export const InventorySearch = (props) => {
  const {
    searchResult
  } = props;
  const [modal, setModal] = useState(false);
  const toggleDetails = () => setModal(!modal);


  return (
    <>
      <Card>
        <CardBody>
          <CardTitle tag="h5">Brand: {searchResult.brand}</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">{searchResult.name}</CardSubtitle>
        </CardBody>
       {searchResult.image.thumbnail ? <img width="100%" src={searchResult.image.thumbnail} alt="shoe thumbnail"/> : "NO IMAGE AVAILABLE"}
        <CardBody>
          <CardText>
            sku: {searchResult.sku}<br />
            Gender: {searchResult.gender}<br />
            Release Year: {searchResult.releaseYear}<br />
            Colorway: {searchResult.colorway}
          </CardText>
        </CardBody>
        <Button id="apiSave" color="info" className="btn btn-primary" onClick={(event) => {
          event.preventDefault()
          toggleDetails()
        }}>SELECT</Button>
      </Card>

        


      <Modal isOpen={modal} toggle={toggleDetails}>
        <ModalHeader  className="ModalCloseBtn"  charCode="x" toggle={toggleDetails}>UPDATE DETAILS</ModalHeader>
        <ModalBody>
          <InventoryDetail databaseItem={searchResult}/>
        </ModalBody>
      </Modal>
    </>
  )
}
