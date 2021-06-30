import React, { useContext, useEffect, useState } from "react"
import { ReminderContext } from "./RemindersProvider"
import { useHistory } from 'react-router-dom';
import { Button, Form, Input } from 'reactstrap';
import "./Reminders.css"

export const ReminderForm = ({IncomingReminder}) => {
    const { addReminder, getReminderById, updateReminder } = useContext(ReminderContext) // gets data from provider
    const [reminder, setReminder ] = useState({}) // initiallizes reminder state to an empty object
	  const history = useHistory(); // allows for rerouting
    const userId = parseInt(localStorage.getItem("wearhouse_user")) // retrieves userId from local storage

    useEffect(() => {
      if(IncomingReminder !== {}) {
        getReminderById(IncomingReminder.id)
        .then(remind => {
          setReminder(remind)
        })
      }
    }, [IncomingReminder])
   

    const handleControlledInputChange = (event) => {
      const newReminder = { ...reminder }
      newReminder[event.target.name] = event.target.value
      setReminder(newReminder)
    }

    const handleSaveReminder = () => {
        if (IncomingReminder.id){
          console.log("UPDATING!")
          //PUT - update
          updateReminder({
              id: reminder.id,
              message: reminder.message,
              date: reminder.date,
              userId: userId
          })
          history.push("/Reminders")
        }else {
          //POST - add
          addReminder({
              date: reminder.date,
              message: reminder.message,
              userId: userId
          })
          .then(() => history.push("/Reminders"))
        }
      }
      
      return (
        <>
          <Form classname="reminderForm">
            <h2 className="reminderForm__title">{IncomingReminder.id ? "Edit" : "New Reminder"}</h2>
            <fieldset className="modalReminder">
              <Input size="lg" type="textarea" id="reminder__message" name="message" placeholder="reminder message" onChange={handleControlledInputChange} defaultValue={reminder.message} />
              <Input type="date" id="reminder__date" name="date" placeholder="reminder message" onChange={handleControlledInputChange} defaultValue={reminder.date} />
            </fieldset><br />
            <Button color="info" className="btn btn-primary"
              onClick={event => {
                event.preventDefault()
                handleSaveReminder()
                window.location.reload()
              }}
            >SAVE</Button>
            
          </Form>          
        </>
  )   
}