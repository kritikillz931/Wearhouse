import React, { useContext, useEffect, useState } from "react"
import { InventoryContext } from "./InventoryProvider"
import { useParams, useHistory } from "react-router-dom"



export const InventoryDetail = () => {
    // references the fetch calls in InventoryProvider(inventory data)
    const { inventoryList, releaseInventory } = useContext(InventoryContext)
    // initializeS the inventory state
    const [inventory, setInventory] = useState({})

    //lets you access the parameters of the current route (inventoryId)
    const { inventoryId } = useParams();

    //Finds the inventory id that is equal to the inventory id in useParams
    useEffect(() => {
        const thisInventory = inventoryList.find(i => i.id === parseInt(inventoryId))
    // sets the inventory state with current inventory
        setInventory(thisInventory)
        // dependency array, will render page each time inventory id changes
    }, [inventoryId])

    //variable stores the ability to manipulate the url 
    const history = useHistory()

    
    const handleRelease = () => {
    // release inventory functions takes argument of inventory id, deletes the inventory, then history.push navigates user back to inventoryList list
        releaseInventory(inventory.id)
            .then(() => {
                history.push("/Inventory")
            })
    }

    // returns jsx for inventory details
    return (

        <section className="inventory">
            <h3 className="inventory__brand">{inventory.brand}</h3>
            <div className="inventory__name">{inventory.name}</div>
            <div className="inventory__size">{inventory.size}</div>
            <div className="inventory__price">{inventory.price}</div>
            <div className="inventory__marketValue">{inventory.marketValue}</div>
            <div className="inventory__quantity">{inventory.quantity}</div>
            <button onClick={handleRelease}>Release inventory</button>
            <button onClick={() => {
                history.push(`/inventoryList/details/edit/${inventory.id}`)
            }}>Edit</button>
        </section>
    )

}