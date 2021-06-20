import React, { useContext, useEffect, useState } from "react"
import { InventoryContext } from "./InventoryProvider"
import "./Inventory.css"
import { InventorySearch} from "./InventorySearch"

export const InventoryForm = () => {
  //getting fetch calls from providers
    const { inventoryList, searchSneakerDatabase } = useContext(InventoryContext)
    const [searchResults, setSearchResults] = useState([])
  const [searchTerms, setSearchTerms] = useState("")

    useEffect(() => {
     
     console.log(inventoryList)
// setSearchResults(inventoryList)
// console.log(searchResults)
    }, [inventoryList])
   

    const handleControlledInputChange = (event) => {
      setSearchTerms(event.target.value)
    }

    const search = (words) => {
      searchSneakerDatabase(words)
      }
      
    

      return (
        <>
          <form className="inventoryForm">
            
            <fieldset>
              <input type="text" id="inventory__quantity" name="message" placeholder="Search By Sku..." onChange={handleControlledInputChange} />
            </fieldset>
            <button className="btn btn-primary"
            onClick={event => {
              event.preventDefault()
              search(searchTerms)
            }}>Search By Sku</button>
          </form>
            <div>{inventoryList.results?.map(singleResult => {
              return <InventorySearch key={singleResult.id} searchResult={singleResult} />

              
            })}</div>
        </>

      )
    





  // return (
  //   <Form className="inventoryForm">
  //     <h2 className="inventoryForm__title">{inventoryId ? <> Edit inventory</> : <> New inventory</>}</h2>
  //     <FormGroup>
        
  //         <Label htmlFor="inventoryMessage">inventory: </Label>
  //         <Input type="text" id="inventoryMessage" name="name" required autoFocus className="form-control"
  //         placeholder="Type inventory Here"
  //         onChange={(event) => {
  //           setinventoryMessage(event.target.value)
  //         }}
  //         defaultValue={inventory.message}
  //         />
  //         <Input  id="inventoryDate" name="date" required autoFocus className="form-control"type="date" onChange={e=> setinventoryDate(e.target.value)} />
       
  //     </FormGroup>

  //     <Button className="btn btn-primary"
  //       onClick={event => {
  //         event.preventDefault() 
  //         search()
  //       }}>
  //     {inventoryId ? <>Update</> : <>Save </>}</Button>
  //   </Form>
  // )
}