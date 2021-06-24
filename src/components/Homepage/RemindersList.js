import React, { useContext, useEffect, useState } from "react"
import { ReminderContext } from "./RemindersProvider"
import { useHistory } from "react-router-dom"
import { Button, Modal, ModalBody, ModalFooter, Table } from 'reactstrap';
import "./ReminderList.css"
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

  // when delete button pressed, reminder is removed from database
  const handleRelease = (reminderId) => {
    releaseReminder(reminderId)
      .then(() => {
        history.push("/Reminders")
      })
  }

  return (
    <>
      <div>
        <section className="ReminderContainer">
          <div className="welcome">WELCOME BACK, {currentUser.userName}</div>
          <div className="todayIs">TODAY IS {todaysDate}</div>

          <div className="reminders">
            <Table dark>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Reminder</th>
                  <th>actions</th>
                </tr>
              </thead>
              <tbody>
              {
                filteredReminders.map(reminder => {
                  return (
                    <tr key={reminder.id}>
                      <td>{reminder.date}</td>
                      <td>{reminder.message}</td>
                      <td>
                        <Button className="text-white" color="info" size="sm" style={{ height: '30px', width: '40px' }} 
                          onClick={
                            (event) => {
                              event.preventDefault()
                              setReminder(reminder)
                              toggle()
                            }                      
                          }>edit
                        </Button> 
                      
                        <Button 
                          className="text-white" 
                          color="info" size="sm" 
                          style={{ height: '30px', width: '60px' }} 
                          onClick={() => handleRelease(reminder.id)}>
                            Delete
                        </Button>
                      </td>
                    </tr>
                  )
                })
              }
              </tbody>
            </Table>
          </div>
          <div>
            <Button className="text-white" size="sm" style={{ height: '30px', width: '125px' }} color="info" 
             onClick={
              (event) => {
                event.preventDefault()
                setReminder({})
                toggle()
              }                      
            }>
              New Reminder
            </Button>
          </div>
        </section>
      </div>

      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalBody>
          <ReminderForm IncomingReminder={reminder} />
        </ModalBody>
        <ModalFooter>
          <Button color="info" onClick={toggle}>Cancel</Button>{''}
        </ModalFooter>
      </Modal>
    </>
  )
}



