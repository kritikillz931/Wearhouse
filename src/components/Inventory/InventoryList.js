import React, { useContext, useEffect, useState } from "react"
import { InventoryContext } from "./InventoryProvider"
import { useHistory } from "react-router-dom"
import { Table, Button, Modal, ModalBody, ModalHeader, ModalFooter, } from 'reactstrap';
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
      <div>
        <section className="InventoryContainer">
          <div ><Table dark><thead><tr><th>Silhouette</th><th>Brand</th><th>Name</th><th>Size(per)</th><th>Price(per)</th><th>Market Value(per)</th><th>Quantity</th><th>Actions</th></tr></thead><tbody>
            {
              filteredInventoryList.map(inventory => {
                return (
                  <tr key={inventory.id}>
                    <td><img style={{ height: '100px', width: '100px' }} className="silhouetteImg" src={inventory.silhouette}></img></td><td className="prodInfo">{inventory.brand}</td><td className="prodInfo">{inventory.name}</td><td className="prodInfo">{inventory.size}</td><td className="prodInfo">{inventory.price}</td><td className="prodInfo">{inventory.marketValue}</td><td className="prodInfo">{inventory.quantity}</td><td><Button className="text-white" color="info" size="sm" style={{ height: '30px', width: '40px' }} onClick={(event) => {
                      event.preventDefault()
                      openEditModal(inventory.id)
                    }}>edit</Button> <Button className="text-white" color="info" size="sm" style={{ height: '30px', width: '60px' }} onClick={() => handleRelease(inventory.id)}>Delete</Button></td>
                  </tr>
                )
              })
            }
          </tbody></Table>
          </div>
        </section>
          <div className="totalsContainer">
            <div className="text-white">
              <div className="totalPrice">
                <TotalPricePaid inventoryList={inventoryList} />
              </div>
              <div className="totalMarket">
                <TotalMarketPrice inventoryList={inventoryList} />
              </div>
              <div className="totalQuantity">
                <TotalQuantityAmount inventoryList={inventoryList} />
              </div>
            </div>
            <Button className="text-white" size="sm" style={{ height: '30px', width: '125px' }} color="info" onClick={toggle} >
              Add New
              </Button>
          </div>
      </div>

      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalBody>
          <InventoryForm onClick={toggle} inventoryList={inventoryList} />
        </ModalBody>
        <ModalFooter>
          <Button color="info" onClick={toggle}>Cancel</Button>{''}
        </ModalFooter>
      </Modal>

      <Modal isOpen={editModal} className={className}>
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
