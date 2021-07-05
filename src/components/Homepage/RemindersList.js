// RemindersList.js renders table of reminder for current user
import React, { useContext, useEffect, useState } from "react"
import { ReminderContext } from "./RemindersProvider"
import { Button, Container, Jumbotron, Modal, ModalBody, ModalHeader, Table } from 'reactstrap';
import "./Reminders.css"
import { ReminderForm } from "../Homepage/ReminderForm"

export const ReminderList = () => {
  const { reminders, getReminders } = useContext(ReminderContext)
  const [filteredReminders, setFiltered] = useState([])
  const [reminder, setReminder] = useState({})
  const [currentUser, setCurrentUser] = useState({})

  // modal open / close functionality
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const todaysDate = new Date().toLocaleDateString() // gets today's date to display on homepage
  const userId = localStorage.getItem("wearhouse_user") // gets userID to use in getCurrentUser function

  // gets the current user from the database and sets the currentUser state to the user object
  const getCurrentUser = () => {
    fetch(`http://localhost:8088/users/${userId}`)
      .then(res => res.json())
      .then(setCurrentUser)
  }

  // Empty dependency array - useEffect only runs after first render
  useEffect(() => {
    getReminders()
    getCurrentUser()
  }, [])

  // when reminders is updated or changed, this useEffect gets all reminders again and sets the filtered reminders to the updated array of reminders. 
  useEffect(() => {
    getReminders().then(setFiltered(reminders)) 
  }, [reminders])


  // renders the html for the reminders table, add new reminder button and reminder form modal.
  return (
    <>
      <div className="ReminderContainer">
        <Container fluid="md" >
          <Jumbotron fluid className="text-white" id="remindersHeader">
            <h1 className="display-3">WELCOME BACK, {currentUser.userName}</h1>
            <p className="display-6">TODAY IS {todaysDate}</p>
          </Jumbotron>

          
            <Table responsive dark>
              <thead>
                <tr>
                  <th className="reminderDateCol">Date</th>
                  <th className="reminderReminderCol">Reminder</th>
                </tr>
              </thead>
              <tbody>
              {
                filteredReminders.map(reminder => {
                  return (
                    <tr key={reminder.id} onClick={() => {
                      setReminder(reminder)
                      toggle()
                    }

                    }>
                      <td>{reminder.date}</td>
                      <td>{reminder.message}</td>
                    </tr>
                  )
                })
              }
              </tbody>
            </Table>
            <Button className="text-white" size="sm" block  color="info" 
             onClick={
              (event) => {
                event.preventDefault()
                setReminder({})
                toggle()
              }                      
            }>
              NEW REMINDER
            </Button>
          </Container>
      </div>

      <Modal isOpen={modal} toggle={toggle} >
        <ModalHeader className="reminderForm__title" toggle={toggle} className="ModalCloseBtn" charCode="x">
          {reminder.id ? "EDIT REMINDER" : "ADD NEW REMINDER"}
        </ModalHeader>
        <ModalBody>
          <ReminderForm IncomingReminder={reminder} />
        </ModalBody>
      </Modal>
    </>
  )
}



