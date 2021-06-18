import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data
export const InventoryContext = createContext()

// This component establishes what data can be used.
export const InventoryProvider = (props) => {
    const [inventoryList, setInventoryList,] = useState([])
    const [searchTerms, setSearchTerms ] = useState("")
    // get userId for currently logged in user
    const userId = localStorage.getItem("wearhouse_user")

    // get inventory list for currently logged in user
    const getInventoryList = () => {
        fetch(`http://localhost:8088/inventory?userId=${userId}`)
        .then(res => res.json())  
        .then(setInventoryList)
    }

    const searchSneakerDatabase = (searchSku) => {
        fetch(``)
    }

    const addInventory = inventory => {
        return fetch("http://localhost:8088/Inventory", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(inventory)
        })
        .then(response => response.json())
    }

    const getInventoryById = inventoryId => {
        return fetch (`http://localhost:8088/Inventory/${inventoryId}`)
        .then(res => res.json())
    }


    const releaseInventory = inventoryId => {
        return fetch(`http://localhost:8088/Inventory/${inventoryId}`, {
            method: "DELETE"
        })
            .then(getInventoryList)
    }

    const updateInventory = inventory => {
        return fetch(`http://localhost:8088/Inventory/${inventory.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(inventory)
        })
          .then(getInventoryList)
      }

    /*
        You return a context provider which has the
        `inventoryList` state, `getInventoryList` function,
        and the `addInventory` function as keys. This
        allows any child elements to access them.
    */
    return (
        <InventoryContext.Provider 
        value={{
            inventoryList, 
            getInventoryList, 
            addInventory,
            releaseInventory,
            updateInventory,
            getInventoryById,
            searchTerms,
            setSearchTerms
        }}>
            {props.children}
        </InventoryContext.Provider>
    )
}