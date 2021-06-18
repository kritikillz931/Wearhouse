import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data
export const ReminderContext = createContext()

// This component establishes what data can be used.
export const RemindersProvider = (props) => {
    const [reminders, setReminders,] = useState([])
    const [searchTerms, setSearchTerms ] = useState("")
    // get userId for currently logged in user
    const userId = localStorage.getItem("wearhouse_user")

    const getReminders = () => {
        return fetch(`http://localhost:8088/reminders?userId=${userId}`)
        .then(res => res.json())
        .then(setReminders)
    }

    const addReminder = reminder => {
        return fetch("http://localhost:8088/reminders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reminder)
        })
        .then(response => response.json())
    }

    const getReminderById = reminderId => {
        return fetch (`http://localhost:8088/reminders/${reminderId}`)
        .then(res => res.json())
    }


    const releaseReminder = reminderId => {
        return fetch(`http://localhost:8088/reminders/${reminderId}`, {
            method: "DELETE"
        })
            .then(getReminders)
    }

    const updateReminder = reminderObj => {
        return fetch(`http://localhost:8088/reminders/${reminderObj.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(reminderObj)
        })
          .then(getReminders)
      }
      

    /*
        You return a context provider which has the
        `reminders` state, `getReminders` function,
        and the `addReminders` function as keys. This
        allows any child elements to access them.
    */
    return (
        <ReminderContext.Provider 
        value={{
            reminders, 
            getReminders, 
            addReminder,
            releaseReminder,
            updateReminder,
            getReminderById,
            searchTerms,
            setSearchTerms
        }}>
            {props.children}
        </ReminderContext.Provider>
    )
}