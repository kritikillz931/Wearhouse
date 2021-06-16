import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data
export const ReminderContext = createContext()

// This component establishes what data can be used.
export const RemindersProvider = (props) => {
    const [reminders, setReminders,] = useState([])
    const [searchTerms, setSearchTerms ] = useState("")

    const getReminders = () => {
        return fetch("http://localhost:8088/reminders")
        .then(res => res.json())
        .then(setReminders)
    }

    const addReminders = reminder => {
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

    const updateReminder = reminder => {
        return fetch(`http://localhost:8088/reminders/${reminder.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(reminder)
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
            addReminders,
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