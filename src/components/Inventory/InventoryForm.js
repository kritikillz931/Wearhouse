import React, { useContext, useEffect, useState } from "react"
import { InventoryContext } from "./InventoryProvider"
import "./Inventory.css"
import { InventorySearch } from "./InventorySearch"
import { Button, Form, Input, InputGroup, InputGroupAddon } from "reactstrap"


export const InventoryForm = () => {
  const { nameSearchResults, skuSearchResults, searchSku, searchName } = useContext(InventoryContext)
  const [skuSearchTerms, setSkuSearchTerms] = useState("")
  const [brandSearchTerms, setBrandSearchTerms] = useState("")
  const [nameSearchTerms, setNameSearchTerms] = useState("")
  const [skuLoading, setSkuLoading] = useState(false)

  const handleSkuInputChange = (event) => {
    setSkuSearchTerms(event.target.value)
  }
  const handleBrandInputChange = (event) => {
    setBrandSearchTerms(event.target.value)
  }
  const handleNameInputChange = (event) => {
    setNameSearchTerms(event.target.value)
  }


  const search = (typeOfSearch) => {
    const tos = typeOfSearch
    if (tos === "skuSearch") {
      setSkuLoading(true)
      setBrandSearchTerms("")
      setNameSearchTerms("")
      searchSku(skuSearchTerms)
      setSkuSearchTerms("")
      setSkuLoading(false)
    } else if (tos === "nameSearch") {
      setSkuSearchTerms("")
      searchName(brandSearchTerms, nameSearchTerms)
      setBrandSearchTerms("")
      setNameSearchTerms("")
    } else {
      console.log("error on inventory Form page")
    }
  }




  return (
    <>
      <section id="inventoryModal">
        <InputGroup>
          <Input type="text" id="inventory__sku" name="sku" placeholder="SEARCH BY SKU" value={skuSearchTerms} onChange={handleSkuInputChange} />
          <InputGroupAddon addonType="append"> <Button color="info" onClick={event => {
            event.preventDefault()
            search("skuSearch")
          }}>SEARCH BY SKU</Button> </InputGroupAddon>
        </InputGroup>
        <hr />
        <p id="or">NO SKU AVAILABLE? TRY SEARCHING BY BRAND AND NAME </p>
        <hr />

        <InputGroup>
          <Input type="text" id="inventory__brand" name="message" placeholder="BRAND" value={brandSearchTerms} onChange={handleBrandInputChange} />
          <Input type="text" id="inventory__name" name="message" placeholder="NAME" value={nameSearchTerms} onChange={handleNameInputChange} />
          <InputGroupAddon addonType="append">
            <Button color="info" onClick={event => {
              event.preventDefault()
              search("nameSearch")
            }}>SEARCH BY NAME</Button> </InputGroupAddon>
        </InputGroup>
        <hr />
        <br />



        <div >{skuSearchResults.results?.map(singleResult => {
          return <InventorySearch key={singleResult.id} searchResult={singleResult} />
        })}</div>
        <div >{nameSearchResults.results?.map(singleResult => {
          return <InventorySearch key={singleResult.id} searchResult={singleResult} />
        })}</div>
      </section>
    </>

  )
}