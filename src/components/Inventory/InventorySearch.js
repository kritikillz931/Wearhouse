import React, { useContext } from "react"
import { InventoryContext } from "./InventoryProvider"


export const InventorySearch = () => {
  const { setSearchTerms } = useContext(InventoryContext)

  return (
    <>
      Search By SKU
      <input type="text"
        className="input--wide"
        onKeyUp={(event) => setSearchTerms(event.target.value)}
        placeholder="Search By SKU... " />
    </>
  )
}