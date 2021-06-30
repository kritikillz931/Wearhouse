import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data
export const InventoryContext = createContext()

// This component establishes what data can be used.
export const InventoryProvider = (props) => {
    const [inventoryList, setInventoryList,] = useState([])
    const [skuSearchResults, setSkuSearchResults] = useState([])
    const [nameSearchResults, setNameSearchResults] = useState([])
    const [unshippedInventory, setUnshippedInventory] = useState([])
    
    const [searchTerms, setSearchTerms ] = useState("")
    // get userId for currently logged in user
    const userId = localStorage.getItem("wearhouse_user")

    // get inventory list for currently logged in user
    const getInventoryList = () => {
        fetch(`http://localhost:8088/inventoryItems?userId=${userId}`)
        .then(res => res.json())  
        .then(setInventoryList)
    }

    const getUnshippedInventoryList = () => {
        fetch(`http://localhost:8088/inventoryItems?_embed=trackingDetails&userId=${userId}`)
        .then(res => res.json())
        .then(setUnshippedInventory)
    }



    const searchSku = (searchSku) => {
        setNameSearchResults([])
        fetch(`https://the-sneaker-database.p.rapidapi.com/sneakers?limit=100&sku=${searchSku}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "092cb29a5fmshb82b4c04414c40cp13af28jsn2b6ebd07746b",
                "x-rapidapi-host": "the-sneaker-database.p.rapidapi.com"
            }
        })
        .then(res => res.json())  
        .then(setSkuSearchResults)
    }


    const searchName = (searchBrand, searchName) => {
        setSkuSearchResults([])
        fetch(`https://the-sneaker-database.p.rapidapi.com/sneakers?limit=10&brand=${searchBrand}&name=${searchName}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "092cb29a5fmshb82b4c04414c40cp13af28jsn2b6ebd07746b",
                "x-rapidapi-host": "the-sneaker-database.p.rapidapi.com"
            }
        })
        .then(res => res.json())  
        .then(setNameSearchResults)
    }


    const addInventory = inventory => {
        return fetch("http://localhost:8088/inventoryItems", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(inventory)
        })
        .then(response => response.json())
    }

    const getInventoryById = inventoryId => {
        return fetch (`http://localhost:8088/inventoryItems/${inventoryId}`)
        .then(res => res.json())
    }


    const releaseInventory = inventoryId => {
        return fetch(`http://localhost:8088/inventoryItems/${inventoryId}`, {
            method: "DELETE"
        })
            .then(getInventoryList)
    }

    const updateInventory = inventory => {
        return fetch(`http://localhost:8088/inventoryItems/${inventory.id}`, {
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
            unshippedInventory,
            searchTerms,
            setSearchTerms,
            searchSku,
            skuSearchResults,
            nameSearchResults,
            searchName,
            getUnshippedInventoryList
        }}>
            {props.children}
        </InventoryContext.Provider>
    )
}

// login with github - a9a32167c0msh7952c8897bffb8ap1bf7c8jsnf709d439260f
// sneakerapi@emberparr.com - aee995da77mshe4417f3c39641d3p1149adjsnd7546f27c093
// sneakerapi2@emberparr.com - 092cb29a5fmshb82b4c04414c40cp13af28jsn2b6ebd07746b
// sneakerapi3@emberparr.com - 092cb29a5fmshb82b4c04414c40cp13af28jsn2b6ebd07746b