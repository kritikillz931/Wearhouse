import React, { useContext, useEffect, useState } from "react"
import { InventoryContext } from "./InventoryProvider"
import "./Inventory.css"
import { InventorySearch} from "./InventorySearch"

export const InventoryForm = () => {
  //getting fetch calls from providers
    const { nameSearchResults, skuSearchResults, searchSku, searchName } = useContext(InventoryContext)
    const [searchResults, setSearchResults] = useState([])
  const [skuSearchTerms, setSkuSearchTerms] = useState("")
  const [brandSearchTerms, setBrandSearchTerms] = useState("")
  const [nameSearchTerms, setNameSearchTerms] = useState("")

    useEffect(() => {
     
    setSearchResults([])
    }, [skuSearchResults, nameSearchResults])
   

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
        setBrandSearchTerms("")
        setNameSearchTerms("")
        searchSku(skuSearchTerms)
        setSkuSearchTerms("")
      } else if (tos === "nameSearch") {
        setSkuSearchTerms("")
        searchName(brandSearchTerms, nameSearchTerms)
        setBrandSearchTerms("")
        setNameSearchTerms("")
      } else {
        console.log("error on inventory form page")
      }
    }

  
    

      return (
        <>
          <form className="inventoryForm">
            
            <fieldset>
              <input type="text" id="inventory__quantity" name="sku" placeholder="Search By Sku..." value={skuSearchTerms} onChange={handleSkuInputChange} />
            </fieldset>
            <button className="btn btn-primary"
            onClick={event => {
              event.preventDefault()
              search("skuSearch")
            }}>Search By Sku</button>


 <fieldset>
       <input type="text" id="inventory__quantity" name="message" placeholder="Search By Brand..." value={brandSearchTerms} onChange={handleBrandInputChange} />
              <input type="text" id="inventory__quantity" name="message" placeholder="Search By Name..." value={nameSearchTerms} onChange={handleNameInputChange} />
            </fieldset>
            <button className="btn btn-primary"
            onClick={event => {
              event.preventDefault()
              search("nameSearch")
            }}>Search By Name</button> 

          </form> 
            <div >{skuSearchResults.results?.map(singleResult => {
              return <InventorySearch key={singleResult.id} searchResult={singleResult} />
            })}</div>
            <div >{nameSearchResults.results?.map(singleResult => {
              return <InventorySearch key={singleResult.id} searchResult={singleResult} />
            })}</div>
            
        </>

      )
}