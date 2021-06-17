import React, { useContext, useEffect, useState } from "react"
import { ReminderContext } from "./RemindersProvider"
import "./ReminderList.css"
import { useParams, useHistory } from "react-router-dom"



export const ReminderDetail = () => {
    // references the fetch calls in reminderProvider(reminder data)
    const { reminders, releaseReminders } = useContext(ReminderContext)
    // initializeS the reminder state
    const [reminder, setreminder] = useState('')

    //lets you access the parameters of the current route (reminderId)
    const { reminderId } = useParams();

    //Finds the reminder id that is equal to the reminder id in useParams
    useEffect(() => {
        const thisreminder = reminders.find(a => a.id === parseInt(reminderId)) || { location: {}, customer: {} }
    // sets the reminder state with current reminder
        setreminder(thisreminder)
        // dependency array, will render page each time reminder id changes
    }, [reminderId])

    //variable stores the ability to manipulate the url 
    const history = useHistory()

    
    const handleRelease = () => {
    // release reminder functions takes argument of reminder id, deletes the reminder, then history.push navigates user back to reminders list
        releaseReminders(reminder.id)
            .then(() => {
                history.push("/Reminders")
            })
    }

    // returns jsx for reminder details
    return (

        <section className="reminder">
            <h3 className="reminder__message">{reminder.message}</h3>
            <button onClick={() => {
                history.push(`/Reminders`)
            }}>Save</button>

        </section>
    )

}