import React from "react"
import {useEffect, useState, useContext} from "react"
import { Col } from "reactstrap"
import {InventoryContext} from "./InventoryProvider"




export const TotalMarketPrice = () => {
    const [price, setPrice] = useState(0)
    const {getInventoryList, inventoryList} = useContext(InventoryContext)
    useEffect(() => {
        getInventoryList()
    }, [])
    useEffect(() => {
        let total = 0
        inventoryList.forEach(inventory => {
            const product = parseInt(inventory.marketValue) * parseInt(inventory.quantity)
            total += product 
        })
        setPrice(total)
    }, [inventoryList])

    return (
        <>
        <Col>
        Total Market Value:<br /> ${price}
        </Col>
        </>
    )
}

