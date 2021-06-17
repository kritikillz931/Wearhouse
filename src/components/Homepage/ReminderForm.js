import React, { useContext, useEffect, useState } from "react"
import { ReminderContext } from "./RemindersProvider"
import { useHistory, useParams } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

export const ReminderForm = () => {
  //getting fetch calls from providers
    const { addReminder, getReminderById, updateReminder } = useContext(ReminderContext)

   //initializes reminder state
    const [reminder, setReminder ] = useState({})
    //wait for data before button is active
    const [isLoading, setIsLoading] = useState(true);
    const [reminderMessage, setReminderMessage] = useState("")
    const [reminderDate, setReminderDate] = useState("")
    //gets reminder id from url route
    const {reminderId} = useParams();

    //gives ability to control navigation
	  const history = useHistory();


    useEffect(() => {
      setReminderMessage('')
      setReminderDate('')
    }, [])
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
      setIsLoading(false)
      setReminder(newReminder)
    }
    

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
              date: reminderDate,
              message: reminderMessage
          })
          .then(() => history.push("/reminders"))
        }
      }
      
    


    //since state controlls this component, we no longer need
    //useRef(null) or ref
  return (
    <Form className="reminderForm">
      <h2 className="reminderForm__title">{reminderId ? <> Edit Reminder</> : <> New Reminder</>}</h2>
      <FormGroup>
        
          <Label htmlFor="reminderMessage">Reminder: </Label>
          <Input type="text" id="reminderMessage" name="name" required autoFocus className="form-control"
          placeholder="Type Reminder Here"
          defaultValue={reminder.message}
          onChange={e=> setReminderMessage(e.target.value)}/>
          <Input id="reminderDate" name="date" required autofocus className="form-control"type="date" onChange={e=> setReminderDate(e.target.value)} />
       
      </FormGroup>

      <Button className="btn btn-primary"
        // disabled={isLoading}
        onClick={event => {
          event.preventDefault() // Prevent browser from submitting the form and refreshing the page
          handleSaveReminder()
        }}>
      {reminderId ? <>Save</> : <>Update </>}</Button>
    </Form>
  )
}