import React, { useContext, useEffect, useState } from "react"
import { InventoryContext } from "./InventoryProvider"
import { useHistory } from "react-router-dom"
import { Table, Button, Modal, ModalBody, ModalHeader, ModalFooter, Container, Row, Jumbotron, } from 'reactstrap';
import "./Inventory.css"
import { TotalPricePaid } from "./InventoryTotalPrice"
import { TotalMarketPrice } from "./InventoryMarketPrice"
import { TotalQuantityAmount } from "./InventoryQuantityAmount";
import { InventoryForm } from "./InventoryForm";
import { InventoryDetail } from "./InventoryDetail";



export const InventoryList = (props) => {
  const {  inventoryList, getInventoryList, releaseInventory, searchTerms } = useContext(InventoryContext)
  const {
    className
  } = props;
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [filteredInventoryList, setInventoryList] = useState([])
  const [editModal, setEditModal] = useState(false);
  const history = useHistory()

  useEffect(() => {
    getInventoryList()
    localStorage.removeItem("inventoryId")
  }, [])

  useEffect(() => {
    setInventoryList(inventoryList)
  }, [inventoryList])

  useEffect(() => {
    if (searchTerms !== "") {
      const subset = inventoryList.filter(inventory => inventory.sku.toLowerCase().includes(searchTerms))
      setInventoryList(subset)
    } else {
      setInventoryList(inventoryList)
    }
  }, [searchTerms, inventoryList])


  const handleRelease = (inventoryId) => {
    releaseInventory(inventoryId)
      .then(() => {
        history.push("/Inventory")
      })
  }

  const openEditModal = (id) => {
    localStorage.setItem("inventoryId", id)
    setEditModal(true)
    return;
  }


  return (
    <>
      <div className="InventoryContainer">
        <Container fluid="md">
          <Jumbotron fluid className="text-white" id="inventoryHeader">
            <h1 className="display-5">Current Inventory</h1>
          </Jumbotron>
        
          <Table responsive hover dark size="sm">
            <thead>
              <tr>
                <th class="inventoryPicCol">Silhouette</th>
                <th class="inventoryBrandCol">Brand</th>
                <th class="inventoryNameCol">Name</th>
                <th class="inventoryPriceCol">Price Paid</th>
                <th class="inventoryMarketCol">Market Value</th>
                <th class="inventorySizeCol">Size</th>
                <th class="inventoryQtyCol">Qty</th>
                <th class="inventoryActionsCol">Actions</th>
              </tr>
            </thead>
            <tbody className="inventoryTableBody">
            {
              filteredInventoryList.map(inventory => {
                return (
                  <tr key={inventory.id} id="inventoryTableRow" onClick={(event) => {
                    event.preventDefault()
                    openEditModal(inventory.id)
                  }}>
                    <td><img  id="silhouetteImg" src={inventory.silhouette}></img></td>
                    <td id="inventoryBrand">{inventory.brand}</td>
                    <td id="inventoryName">{inventory.name}</td>
                    <td >${inventory.price} <br />/each</td>
                    <td >${inventory.marketValue} <br />/each</td>
                    <td >{inventory.size}</td>
                    <td >{inventory.quantity}</td>
                    <td>
                      {/* <Button className="text-white" color="info" size="sm" style={{ height: '30px', width: '40px' }} onClick={(event) => {
                        event.preventDefault()
                        openEditModal(inventory.id)
                      }}>Edit</Button>  */}
                      <Button className="text-white" color="info" size="sm" style={{ height: '30px', width: '60px' }} onClick={() => handleRelease(inventory.id)}>Delete</Button></td>
                  </tr>
                )
              })
            }
          </tbody></Table>
              <Container className="totalsContainer">
                <Table className="totalsContainer" responsive hover dark size="md">
                  <thead>
                    <th>
                    <TotalPricePaid inventoryList={inventoryList} />
                    </th>
                    <th>
                    <TotalMarketPrice inventoryList={inventoryList} />
                    </th>
                    <th>
                    <TotalQuantityAmount inventoryList={inventoryList} />
                    </th>
                  </thead>
                  
                </Table>
                <Button className="text-white" size="lg" color="info" onClick={toggle} >
                Add New
                </Button>
              </Container>
            </Container>

      </div>

      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalBody>
          <InventoryForm onClick={toggle} inventoryList={inventoryList} />
        </ModalBody>
        <ModalFooter>
          <Button color="info" onClick={toggle}>Cancel</Button>{''}
        </ModalFooter>
      </Modal>

      <Modal id="updateDetailsModal" isOpen={editModal} className={className}>
        <ModalBody>
          <InventoryDetail />
        </ModalBody>
        <ModalFooter>
          <Button color="info" onClick={() => setEditModal(false)}>Cancel</Button>{''}
        </ModalFooter>
      </Modal>

      

    </>
  )
}
