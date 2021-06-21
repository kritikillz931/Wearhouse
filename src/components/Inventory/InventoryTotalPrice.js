import React from "react"
import {useEffect, useState, useContext} from "react"
import {InventoryContext} from "./InventoryProvider"




export const TotalPricePaid = () => {
    const [price, setPrice] = useState(0)
    const {getInventoryList, inventoryList} = useContext(InventoryContext)
    useEffect(() => {
        getInventoryList()
    }, [])
    useEffect(() => {
        let total = 0
        inventoryList.forEach(inventory => {
            const product = parseInt(inventory.quantity) * parseInt(inventory.price)
            total += product 
        })
        setPrice(total)
    }, [inventoryList])

    return (
        <>
        Total Price Spent
        {price}
        </>
    )
}


