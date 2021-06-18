import React, { useContext, useEffect, useState } from "react"
import { InventoryContext } from "./RemindersProvider"
import { ReminderDetail } from "./RemindersDetail"
import { useHistory, Link, useParams } from "react-router-dom"
import { Table, thead, Button } from 'reactstrap';
import backgroundImg from '../Images/SNEAKERSBLURRED.jpg'
import "./InventoryList.css"


export const InventoryList = () => {
    const { inventoryList, getInventoryList, searchTerms, releaseInventory, updateInventory, getInventoryById } = useContext(InventoryContext)
  
    // Since you are no longer ALWAYS displaying all of the inventoryList
    const [filteredInventoryList, setInventoryList] = useState([])
    const [inventory, setInventory ] = useState({})
   
   
    const history = useHistory()
  
    // Empty dependency array - useEffect only runs after first render
    useEffect(() => {
      getInventoryList()
    }, [])
  
    // useEffect dependency array with dependencies - will run if dependency changes (state)
    // searchTerms will cause a change
    useEffect(() => {
      if (searchTerms !== "") {
        // If the search field is not blank, display matching inventoryList
        const subset = inventoryList.filter(inventory => inventory.message.toLowerCase().includes(searchTerms))
        setInventoryList(subset)
      } else {
        // If the search field is blank, display all inventoryList
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
  
    const handleInputChange = (inventoryId) => {
      console.log(inventory)
      updateInventory({
        id: inventoryId,
        brand: inventory.brand,
        date: new Date().toLocaleTimeString() + " " + new Date().toLocaleDateString()
    })
      .then(() => {
        history.push(`/Inventory`)
      })
    }
  
    return (
      <>
  
        <div style={sectionStyle}>
          <section className="InventoryContainer">
            <div className="inventoryList"><Table dark><thead><tr><th>Silhouette</th><th>Brand</th><th>Name</th><th>Size</th><th>Price</th><th>Market Value</th><th>Quantity</th></tr></thead><tbody>
              {
                filteredInventoryList.map(inventory => {
                  return (
                    <tr key={inventory.id}>
                     <td>{inventory.date}</td><td>{inventory.message}</td><td><Button className="text-white" color="info" size="sm" style={{ height: '30px', width: '40px' }} onClick={(event) => {
                       event.preventDefault()
                        history.push(`/Reminders/Details/${inventory.id}`)
                      }}>edit</Button> <Button className="text-white" color="info" size="sm" style={{ height: '30px', width: '60px' }} onClick={() => handleRelease(inventory.id)}>Delete</Button></td>
  </tr>
                    
                  )
                })
              }
              </tbody></Table>
              <Button className="text-white" size="sm" style={{ height: '30px', width: '125px' }} color="info" onClick={() => history.push("/Reminders/Create")}>
                Add New
              </Button>
  
            </div>
          </section>
        </div>
  
      </>
    )
  }
  