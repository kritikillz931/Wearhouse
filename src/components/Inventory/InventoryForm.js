import React, { useContext, useEffect, useState } from "react"
import { InventoryContext } from "./InventoryProvider"
import { useHistory, useParams } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

export const InventoryForm = () => {
  //getting fetch calls from providers
    const { addInventory, getInventoryById, updateInventory } = useContext(InventoryContext)
    const [inventory, setInventory ] = useState({})
    const [isLoading, setIsLoading] = useState(true);
    const {inventoryId} = useParams();
	  const history = useHistory();


    useEffect(() => {
     if(inventoryId) {
       console.log('theres an id.... ')
       getInventoryById(inventoryId)
       .then(inventory => {
         setInventory(inventory)
       })
     }
    }, [])
   

    const handleControlledInputChange = (event) => {
      const newInventory = { ...inventory }
      newInventory[event.target.name] = event.target.value
      setInventory(newInventory)
    }

    const handleSaveInventory = () => {
        if (inventoryId){
          console.log("UPDATING!")
          //PUT - update
          updateInventory({
              id: inventory.id,
              size: inventory.size,
              price: inventory.price,
              quantity: inventory.quantity
          })
          .then(() => history.push(`/Inventory`))
        }else {
          //POST - add
          addInventory({
              date: inventory.date,
              message: inventory.message
          })
          .then(() => history.push("/Inventory"))
        }
      }
      
    

      return (
        <>
          <form classname="inventoryForm">
            <h2 className="inventory__title">{inventoryId ? "Edit" : "New inventory"}</h2>
            <fieldset>
              <input type="text" id="inventory__quantity" name="message" placeholder="inventory quantity" onChange={handleControlledInputChange} defaultValue={inventory.quantity} />
              <input type="date" id="inventory__size" name="date" placeholder="inventory size" onChange={handleControlledInputChange} defaultValue={inventory.size} />
            </fieldset>
            <button className="btn btn-primary"
            onClick={event => {
              event.preventDefault()
              handleSaveInventory()
            }}>Save</button>
          </form>

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
  //         handleSaveInventory()
  //       }}>
  //     {inventoryId ? <>Update</> : <>Save </>}</Button>
  //   </Form>
  // )
}