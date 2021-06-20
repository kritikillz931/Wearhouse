import React, { useContext, useEffect, useState } from "react"
import { InventoryContext } from "./InventoryProvider"
import { useHistory, Link, useParams } from "react-router-dom"
import { Table, thead, Button } from 'reactstrap';
import backgroundImg from '../Images/SNEAKERSBLURRED.jpg'
import "./Inventory.css"



export const InventoryList = () => {
    const { inventoryList, getInventoryList,  releaseInventory, searchTerms, updateInventory, getInventoryById } = useContext(InventoryContext)
  
    // Since you are no longer ALWAYS displaying all of the inventoryList
    const [filteredInventoryList, setInventoryList] = useState([])
    // const [inventory, setInventory ] = useState({})
   
   
    const history = useHistory()
  
    // Empty dependency array - useEffect only runs after first render
    useEffect(() => {
        getInventoryList()
        
        // getInventoryDetails()
        // console.log(filteredInventoryList)
    }, [])

    useEffect(() => {
        setInventoryList(inventoryList)
    }, [inventoryList])

  
    // useEffect dependency array with dependencies - will run if dependency changes (state)
    // searchTerms will cause a change
    useEffect(() => {
      if (searchTerms !== "") {
       
        const subset = inventoryList.filter(inventory => inventory.sku.toLowerCase().includes(searchTerms))
        setInventoryList(subset)
      } else {
        setInventoryList(inventoryList)
      }
    }, [searchTerms, inventoryList])
  
    var sectionStyle = {
      width: "100%",
      height: "937px",
      backgroundImage: `url(${backgroundImg})`
    };
  
    const handleRelease = (inventoryId) => {
      releaseInventory(inventoryId)
        .then(() => {
          history.push("/Inventory")
        })
    }
  
  
    return (
      <>
  
        <div style={sectionStyle}>
          <section className="InventoryContainer">
            <div className="inventoryList"><Table dark><thead><tr><th>Silhouette</th><th>Brand</th><th>Name</th><th>Size</th><th>Price</th><th>Market Value</th><th>Quantity</th><th>Actions</th></tr></thead><tbody>
              {
                filteredInventoryList.map(inventory => {
                    
                  return (
                    <tr key={inventory.id}>
                     <td><img className="silhouetteImg"src={inventory.silhouette}></img></td><td>{inventory.brand}</td><td>{inventory.name}</td><td>{inventory.size}</td><td>{inventory.price}</td><td>{inventory.marketValue}</td><td>{inventory.quantity}</td><td><Button className="text-white" color="info" size="sm" style={{ height: '30px', width: '40px' }} onClick={(event) => {
                       event.preventDefault()
                        history.push(`/Inventory/Details/${inventory.id}`)
                      }}>edit</Button> <Button className="text-white" color="info" size="sm" style={{ height: '30px', width: '60px' }} onClick={() => handleRelease(inventory.id)}>Delete</Button></td>
  </tr>
                    
                  )
                })
              }
              </tbody></Table>
              <Button className="text-white" size="sm" style={{ height: '30px', width: '125px' }} color="info" onClick={() => history.push("/Inventory/Create")}>
                Add New
              </Button>
  
            </div>
          </section>
        </div>
  
      </>
    )
  }
  