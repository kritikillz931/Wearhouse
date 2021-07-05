import React, { useContext, useEffect, useState } from "react"
import { ReminderContext } from "./RemindersProvider"
import { useHistory } from "react-router-dom"
import { Button, Container, Jumbotron, Modal, ModalBody, ModalFooter, ModalHeader, Table } from 'reactstrap';
import "./Reminders.css"
import { ReminderForm } from "../Homepage/ReminderForm"

export const ReminderList = (props) => {
  const { className } = props;
  const { reminders, getReminders, releaseReminder } = useContext(ReminderContext)
  const [filteredReminders, setFiltered] = useState([])
  const [reminder, setReminder] = useState({})
  const [currentUser, setCurrentUser] = useState({})

  // modal open / close
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const todaysDate = new Date().toLocaleDateString() 
  const history = useHistory()
  const userId = localStorage.getItem("wearhouse_user")

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

  useEffect(() => {
    setFiltered(reminders) //set filtered is called when reminders data is updated or changed giving filtered items a value of reminders
  }, [reminders])


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

      <Modal isOpen={modal} toggle={toggle} className={className}>
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



