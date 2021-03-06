import React from "react"
import { Route } from "react-router"
import { ReminderList } from "./Homepage/RemindersList"
import { RemindersProvider } from "./Homepage/RemindersProvider"
import { InventoryList } from "./Inventory/InventoryList"
import { InventoryProvider } from "./Inventory/InventoryProvider"
import { LogOut } from "./Auth/Logout"
import { TrackingProvider } from "./UserTracking/TrackingProvider"
import { TrackingList } from "./UserTracking/TrackingList"




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
            <TrackingProvider>
            <Route exact path="/Inventory">
                <InventoryList />
            </Route>
            </TrackingProvider>
        </InventoryProvider>


        <Route exact path="/LogOut">
            <LogOut />
        </Route>
        
{/* ----------------------------------------------------------------------------- */}        
        
        <TrackingProvider>
        <InventoryProvider>
        <Route path="/Tracking">
            <TrackingList />
        </Route>
        </InventoryProvider>
        </TrackingProvider>
        
        
        
        </>

        
    )
}