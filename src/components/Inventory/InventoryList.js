/* eslint-disable react-hooks/exhaustive-deps */
/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import React, { useContext, useEffect, useState } from "react"
import { InventoryContext } from "./InventoryProvider"
import { Table, Button, Modal, ModalBody, ModalHeader, Container, Jumbotron, } from 'reactstrap';
import "./Inventory.css"
import { TotalPricePaid } from "./InventoryTotalPrice"
import { TotalMarketPrice } from "./InventoryMarketPrice"
import { TotalQuantityAmount } from "./InventoryQuantityAmount";
import { InventoryEstimatedProfits } from "./InventoryEstimatedProfits"
import { InventoryForm } from "./InventoryForm";
import { InventoryDetail } from "./InventoryDetail";



export const InventoryList = (props) => {
  const {  inventoryList, getInventoryList } = useContext(InventoryContext)
  const {
    className
  } = props;
  const [inventoryId, setInventoryId] = useState()
  const [modal, setModal] = useState(false);
  const toggle = () => {
    localStorage.removeItem("inventoryId")
    setModal(!modal)
  };
  const [filteredInventoryList, setInventoryList] = useState([])
  const [editModal, setEditModal] = useState(false);
  const toggleEditModal = () => setEditModal(!editModal)

  useEffect(() => {
    getInventoryList()
    localStorage.removeItem("inventoryId")
  }, [])

  useEffect(() => {
    let inStock = inventoryList.filter(item => parseInt(item.quantity) > 0)
    setInventoryList(inStock)
  }, [inventoryList])


  const openEditModal = (id, name) => {
    setInventoryId(id)
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
        <div className="InventoryTable">
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
              </tr>
            </thead>
            <tbody className="inventoryTableBody">
            {
              filteredInventoryList.map(inventory => {
                return (
                  <tr key={inventory.id} id="inventoryTableRow" onClick={(event) => {
                    event.preventDefault()
                    openEditModal(inventory.id, inventory.name)
                  }}>
                    <td><img alt="shoe silhouette"  id="silhouetteImg" src={inventory.silhouette}></img></td>
                    <td id="inventoryBrand">{inventory.brand}</td>
                    <td id="inventoryName">{inventory.name}</td>
                    <td >${inventory.price} <br />/each</td>
                    <td >${inventory.marketValue} <br />/each</td>
                    <td >{inventory.size}</td>
                    <td >{inventory.quantity}</td>
                    
                  </tr>
                )
              })
            }
            </tbody>
          </Table>
                </div>
              <Container className="totalsContainer">
                <Table responsive hover dark size="md">
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
                    <th>
                      <InventoryEstimatedProfits inventoryList={inventoryList} />
                    </th>
                  </thead>
                  
                </Table>
                <Button className="text-white" size="sm" color="info" onClick={toggle} >
                ADD NEW
                </Button>
              </Container>
            </Container>

      </div>

      <Modal isOpen={modal} toggle={toggle} className={className}>
      <ModalHeader className="ModalCloseBtn" toggle={toggle}>
      <h2 id="inventoryFormHeader">Search The Market</h2>
        </ModalHeader>
        <ModalBody>
          <InventoryForm onClick={toggle} inventoryList={inventoryList} />
        </ModalBody>
      </Modal>

      <Modal id="updateDetailsModal" isOpen={editModal} className={className}>
      <ModalHeader className="ModalCloseBtn" toggle={toggleEditModal}>Update Details for {localStorage.getItem("inventoryName")}</ModalHeader>
        <ModalBody>
          <InventoryDetail inventoryId={inventoryId}/>
        </ModalBody>
      </Modal>

      

    </>
  )
}
