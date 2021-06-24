import React from "react"
import { Route } from "react-router"
import { ReminderList } from "./Homepage/RemindersList"
import { RemindersProvider } from "./Homepage/RemindersProvider"
import { InventoryList } from "./Inventory/InventoryList"
import { InventoryProvider } from "./Inventory/InventoryProvider"




export const ApplicationViews = () => {
    return (
        <>
        <RemindersProvider>
            <Route exact path="/">
                <ReminderList />
            </Route>
            <Route exact path="/Reminders">
                <ReminderList />
            </Route>
        </RemindersProvider>

{/* ----------------------------------------------------------------------------- */}

        <InventoryProvider>
            <Route exact path="/Inventory">
                <InventoryList />
            </Route>
        </InventoryProvider>
        </>
    )
}