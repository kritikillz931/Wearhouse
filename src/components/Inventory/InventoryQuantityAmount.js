/* eslint-disable react-hooks/exhaustive-deps */
/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import React from "react"
import {useEffect, useState, useContext} from "react"
import { Col } from "reactstrap"
import {InventoryContext} from "./InventoryProvider"




export const TotalQuantityAmount = () => {
    const [quantity, setQuantity] = useState(0)
    const {getInventoryList, inventoryList} = useContext(InventoryContext)
    useEffect(() => {
        getInventoryList()
    }, [])
    useEffect(() => {
        let total = 0
        inventoryList.forEach(inventory => {
            const product = parseInt(inventory.quantity)
            total += product 
        })
        setQuantity(total)
    }, [inventoryList])

    return (
        <>
        <Col>
        Total Quantity:<br /> {quantity}
        </Col>
        </>
    )
}

