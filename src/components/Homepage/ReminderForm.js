import React, { useContext, useEffect, useState } from "react"
import { ReminderContext } from "./RemindersProvider"
import { useHistory } from 'react-router-dom';
import { Button, Form, Input, ModalFooter } from 'reactstrap';
import "./Reminders.css"

export const ReminderForm = ({ IncomingReminder }) => {
  const { addReminder, getReminderById, updateReminder, releaseReminder } = useContext(ReminderContext) // gets data from provider
  const [reminder, setReminder] = useState({}) // initiallizes reminder state to an empty object
  const history = useHistory(); // allows for rerouting
  const userId = parseInt(localStorage.getItem("wearhouse_user")) // retrieves userId from local storage

  useEffect(() => {
    if (IncomingReminder !== {}) {
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

  // when delete button pressed, reminder is removed from database
  const handleRelease = (reminderId) => {
    releaseReminder(reminderId)
      .then(() => {
        history.push("/Reminders")
      })
  }

  const refreshPage = () => {
    window.location.reload()
  }

  const handleSaveReminder = () => {
    console.log(IncomingReminder)
    if (IncomingReminder.id) {
      console.log("UPDATING!")
      //PUT - update
      updateReminder({
        id: reminder.id,
        message: reminder.message,
        date: reminder.date,
        userId: userId
      })
      history.push("/Reminders")
    } else {
      console.log("Addinggggg!")
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

        <fieldset className="modalReminder">
          <Input size="sm" type="textarea" id="reminder__message" name="message" placeholder="reminder message" onChange={handleControlledInputChange} defaultValue={reminder.message} />
          <Input size="sm" type="date" id="reminder__date" name="date" onChange={handleControlledInputChange} defaultValue={reminder.date} />
        </fieldset><br />
        <ModalFooter>
        <Button color="info" className="btn btn-primary"
          onClick={event => {
            event.preventDefault()
            handleSaveReminder()
            window.location.reload()
          }}
        >SAVE</Button>
        {reminder.id ? <Button
          color="danger" size="md"
          onClick={() => handleRelease(reminder.id)}>
          DELETE</Button> : <Button color="danger" size="md" onClick={() => refreshPage()}>Cancel</Button>}
          </ModalFooter>


      </Form>
    </>
  )
}