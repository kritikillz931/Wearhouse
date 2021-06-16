import React, { useContext, useEffect, useState } from "react"
import { ReminderContext } from "./RemindersProvider"
import { useHistory, useParams } from 'react-router-dom';

export const ReminderForm = () => {
  //getting fetch calls from providers
    const { addReminder, getReminderById, updateReminder } = useContext(ReminderContext)

   //initializes reminder state
    const [reminder, setReminder ] = useState({})
    //wait for data before button is active
    const [isLoading, setIsLoading] = useState(true);

    //gets reminder id from url route
    const {reminderId} = useParams();

    //gives ability to control navigation
	  const history = useHistory();

    //when field changes, update state. This causes a re-render and updates the view.
    //Controlled component
    const handleControlledInputChange = (event) => {
      //When changing a state object or array,
      //always create a copy make changes, and then set state.
      const newReminder = { ...reminder }
      //reminder is an object with properties.
      //set the property to the new value
      newReminder[event.target.name] = event.target.value
      //update state
      setReminder(newReminder)
    

    const handleSaveReminder = () => {
        if (reminderId){
          //PUT - update
          updateReminder({
              id: reminder.id,
              message: reminder.message,
              date: new Date().toLocaleTimeString() + " " + new Date().toLocaleDateString()
          })
          .then(() => history.push(`/Reminders/Details/Edit/${reminder.id}`))
        }else {
          //POST - add
          addReminder({
              date: reminder.date,
              message: reminder.message
          })
          .then(() => history.push("/Reminders/Create"))
        }
      
    


    //since state controlls this component, we no longer need
    //useRef(null) or ref

    return (
      <form className="reminderForm">
        <h2 className="reminderForm__title">{reminderId ? <> Edit Reminder</> : <> New Reminder</>}</h2>
        <fieldset>
          <div className="form-group">
            <label htmlFor="reminderMessage">Reminder: </label>
            <input type="text" id="reminderMessage" name="name" required autoFocus className="form-control"
            placeholder="Type Reminder Here"
            onChange={handleControlledInputChange}
            defaultValue={reminder.message}/>
          </div>
        </fieldset>

        <button className="btn btn-primary"
          disabled={isLoading}
          onClick={event => {
            event.preventDefault() // Prevent browser from submitting the form and refreshing the page
            handleSaveReminder()
          }}>
        {reminderId ? <>Save Reminder Date</> : <>Add Reminder Date </>}</button>
      </form>
    )
}
    }}