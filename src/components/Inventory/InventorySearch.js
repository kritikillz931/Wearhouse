import React, { useContext } from "react"
import { InventoryContext } from "./InventoryProvider"


export const InventorySearch = ({searchResult}) => {
 
  return (
    <>
<p>Name: {searchResult.name}<br/>
Brand: {searchResult.brand}<br/>
sku: {searchResult.sku}<br/>
Gender: {searchResult.gender}<br/>
Release Year: {searchResult.releaseYear}<br/>
Colorway: {searchResult.colorway}</p>
<img src={searchResult.image.thumbnail}></img>
    <hr/>  
    </>
  )
}