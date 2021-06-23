import React from "react"
import { Route } from "react-router"
import { ReminderForm } from "./Homepage/ReminderForm"
import { ReminderDetail } from "./Homepage/RemindersDetail"
import { ReminderList } from "./Homepage/RemindersList"
import { RemindersProvider } from "./Homepage/RemindersProvider"
import { InventoryList } from "./Inventory/InventoryList"
import { InventoryDetail } from "./Inventory/InventoryDetail"
import { InventoryForm } from "./Inventory/InventoryForm"
import { InventoryProvider } from "./Inventory/InventoryProvider"




export const ApplicationViews = () => {
    return (
        <>
        <RemindersProvider>
            <Route exact path="/">
                <ReminderList />
            </Route>
            <Route path="/Reminders/:reminderId(\d+)">
                <ReminderDetail/>
            </Route>
            <Route exact path="/Reminders">
                <ReminderList />
            </Route>
            <Route exact path="/Reminders/Details/:reminderId(\d+)">
                <ReminderForm />
            </Route>
            <Route exact path="/Reminders/Create">
                <ReminderForm/>
            </Route>
        </RemindersProvider>

{/* ----------------------------------------------------------------------------- */}

        <InventoryProvider>
            <Route path="/Inventory/Details/:inventoryId(\d+)">
                <InventoryDetail />
            </Route>
            <Route exact path="/Inventory">
                <InventoryList />
            </Route>
            <Route exact path="/Inventory/Create">
                <InventoryForm />
            </Route>
        </InventoryProvider>
        </>
    )
}