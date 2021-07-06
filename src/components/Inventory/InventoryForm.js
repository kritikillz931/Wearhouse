import React, { useContext, useEffect, useState } from "react"
import { InventoryContext } from "./InventoryProvider"
import "./Inventory.css"
import { InventorySearch } from "./InventorySearch"
import { Button, Input, InputGroup, InputGroupAddon, Spinner, Alert } from "reactstrap"


export const InventoryForm = () => {
  const { nameSearchResults, skuSearchResults, searchSku, searchName } = useContext(InventoryContext)
  const [skuSearchTerms, setSkuSearchTerms] = useState("")
  const [brandSearchTerms, setBrandSearchTerms] = useState("")
  const [nameSearchTerms, setNameSearchTerms] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSkuInputChange = (event) => {
    setSkuSearchTerms(event.target.value)
  }
  const handleBrandInputChange = (event) => {
    setBrandSearchTerms(event.target.value)
  }
  const handleNameInputChange = (event) => {
    setNameSearchTerms(event.target.value)
  }

  let loadingSection;

  useEffect(() => {
    if (skuSearchResults.count && skuSearchResults !== 0) {
      console.log("SKU SEARCH LOADEDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD")
      setLoading(false)
    } 
    if (nameSearchResults.count && nameSearchResults !== 0) {
      console.log("NAME SEARCH LOADEDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD")
      setLoading(false)
    } 
  }, [loading])


  

  const search = (typeOfSearch) => {
    setLoading(true)
    const tos = typeOfSearch
    if (tos === "skuSearch") {
      setBrandSearchTerms("")
      setNameSearchTerms("")
      searchSku(skuSearchTerms)
      console.log(skuSearchResults)
      setSkuSearchTerms("")
    } else if (tos === "nameSearch") {
      setSkuSearchTerms("")
      searchName(brandSearchTerms, nameSearchTerms)
      setBrandSearchTerms("")
      setNameSearchTerms("")
      console.log(nameSearchResults)
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
          {loading && !nameSearchResults.results && !skuSearchResults.results ? <> <Spinner type="grow" color="info" /> <Spinner type="grow" color="info" /> <Spinner type="grow" color="info" /> </> : ""}
        {loadingSection}

        <div>
          {skuSearchResults?.count === 0 ? <Alert color="warning">No Results Found with that sku</Alert> : ""}
          {nameSearchResults?.count === 0 ? <Alert color="warning">No Results Found with that brand / name</Alert> : ""}
        </div>
        <div >
          {skuSearchResults.results?.map(singleResult => {
          return <InventorySearch key={singleResult.id} searchResult={singleResult} />
        })}</div>
        <div >{nameSearchResults.results?.map(singleResult => {
          return <InventorySearch key={singleResult.id} searchResult={singleResult} />
        })}</div>
      </section>
    </>

  )
}