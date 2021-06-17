import React from "react"
import { Route } from "react-router"
import { ReminderForm } from "./Homepage/ReminderForm"
import { ReminderDetail } from "./Homepage/RemindersDetail"
import { ReminderList } from "./Homepage/RemindersList"
import { RemindersProvider } from "./Homepage/RemindersProvider"



export const ApplicationViews = () => {
    return (
        <>
        <RemindersProvider>
            <Route path="/Reminders/:reminderId(\d+)">
                <ReminderDetail/>
            </Route>
            <Route exact path="/Reminders">
                <ReminderList />
            </Route>
            <Route  path="/Reminders/Details/Edit/:reminderId(\d+)">
                <ReminderForm />
            </Route>
            <Route exact path="/Reminders/Create">
                <ReminderForm/>
            </Route>
        </RemindersProvider>
        </>
    )
}