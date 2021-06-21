import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams, } from 'react-router-dom';
import {Button } from "reactstrap"
import {InventoryContext} from "./InventoryProvider"


export const InventorySearch = ({searchResult}) => {
  const {addInventory, updateInventory} = useContext(InventoryContext)
  
 
  //gets searchResult id from url route
  const {inventoryId} = useParams();

  //gives ability to control navigation
  const history = useHistory();
const userId = parseInt(localStorage.getItem("wearhouse_user"))
  console.log(searchResult)

    const handleSaveInventory = () => {
        if (inventoryId){
          //PUT - update
          updateInventory({
            userId: userId,
            silhouette: searchResult.image.thumbnail,
            brand: searchResult.brand,
           name: searchResult.name,
            marketValue: searchResult.estimatedMarketValue,

          })
          .then(() => history.push(`/Inventory`))
        } else {
          //POST - add
          addInventory({
            userId: userId,
            silhouette: searchResult.image.thumbnail,
            brand: searchResult.brand,
           name: searchResult.name,
            marketValue: searchResult.estimatedMarketValue
          })
          .then(() => history.push("/Inventory"))
        }
      }

  return (
    <>
<p>Name: {searchResult.name}<br/>
Brand: {searchResult.brand}<br/>
sku: {searchResult.sku}<br/>
Gender: {searchResult.gender}<br/>
Release Year: {searchResult.releaseYear}<br/>
Colorway: {searchResult.colorway}</p>
<img src={searchResult.image.thumbnail}></img>
<Button className="btn btn-primary" onClick={event => {
  event.preventDefault()
    handleSaveInventory()
  
}}>Save</Button>
    <hr/>  
    </>
  )
}
