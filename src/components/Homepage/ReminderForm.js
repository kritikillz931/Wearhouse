import React, { useContext, useEffect, useState } from "react"
import { ReminderContext } from "./RemindersProvider"
import { useHistory, useParams } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import "./ReminderList.css"

export const ReminderForm = ({IncomingReminder}) => {
  //getting fetch calls from providers
    const { addReminder, getReminderById, updateReminder } = useContext(ReminderContext)
    const [reminder, setReminder ] = useState({})
    const [isLoading, setIsLoading] = useState(true);
    
	  const history = useHistory();
    const userId = parseInt(localStorage.getItem("wearhouse_user"))
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    useEffect(() => {
       console.log('theres an id.... ')
       getReminderById(IncomingReminder.id)
       .then(remind => {
         setReminder(remind)
       })
    }, [])
   

    const handleControlledInputChange = (event) => {
      const newReminder = { ...reminder }
      newReminder[event.target.name] = event.target.value
      setReminder(newReminder)
    }

    const handleSaveReminder = () => {
        if (IncomingReminder){
          console.log("UPDATING!")
          //PUT - update
          updateReminder({
              id: reminder.id,
              message: reminder.message,
              date: reminder.date,
              userId: userId
          })
          .then(() => setModal(false))
          history.push("/Reminders")
        }else {
          //POST - add
          addReminder({
              date: reminder.date,
              message: reminder.message,
              userId: userId
          })
          .then(() => setModal(false))
          .then(() => history.push("/Reminders"))
        }
      }
      
      return (
        <>
          <Form classname="reminderForm">
            <h2 className="reminderForm__title">{IncomingReminder ? "Edit" : "New Reminder"}</h2>
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
    





  // return (
  //   <Form className="reminderForm">
  //     <h2 className="reminderForm__title">{reminderId ? <> Edit Reminder</> : <> New Reminder</>}</h2>
  //     <FormGroup>
        
  //         <Label htmlFor="reminderMessage">Reminder: </Label>
  //         <Input type="text" id="reminderMessage" name="name" required autoFocus className="form-control"
  //         placeholder="Type Reminder Here"
  //         onChange={(event) => {
  //           setReminderMessage(event.target.value)
  //         }}
  //         defaultValue={reminder.message}
  //         />
  //         <Input  id="reminderDate" name="date" required autoFocus className="form-control"type="date" onChange={e=> setReminderDate(e.target.value)} />
       
  //     </FormGroup>

  //     <Button className="btn btn-primary"
  //       onClick={event => {
  //         event.preventDefault() 
  //         handleSaveReminder()
  //       }}>
  //     {reminderId ? <>Update</> : <>Save </>}</Button>
  //   </Form>
  // )
}