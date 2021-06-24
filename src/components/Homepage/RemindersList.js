import React, { useContext, useEffect, useState } from "react"
import { ReminderContext } from "./RemindersProvider"
import { ReminderDetail } from "./RemindersDetail"
import { useHistory, Link, useParams } from "react-router-dom"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';
import backgroundImg from '../Images/newbg.jpg'
import "./ReminderList.css"
import { ReminderForm } from "../Homepage/ReminderForm"

export const ReminderList = (props) => {
  const { ReminderDetail, reminderList, reminders, getReminders, searchTerms, releaseReminder, updateReminder, getReminderById } = useContext(ReminderContext)
  const {
    newReminder,
    className
  } = props;
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  // Since you are no longer ALWAYS displaying all of the reminders
  const [filteredReminders, setFiltered] = useState([])
  const [reminder, setReminder] = useState({})

  const [currentUser, setCurrentUser] = useState({})

  // get today's date
  const todaysDate = new Date().toLocaleDateString()

  const history = useHistory()

  // get current user info
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

  // useEffect dependency array with dependencies - will run if dependency changes (state)

  useEffect(() => {
    //set filtered is called when reminders data is updated or changed giving filtered items a value of reminders
    setFiltered(reminders)

  }, [reminders])

  var sectionStyle = {
    width: "100%",
    height: "937px",
    backgroundImage: `url(${backgroundImg})`
  };

  const handleRelease = (reminderId) => {
    releaseReminder(reminderId)
      .then(() => {
        history.push("/Reminders")
      })
  }


  return (
    <>

      <div style={sectionStyle}>
        <section className="ReminderContainer">
          <div className="welcome">WELCOME BACK, {currentUser.userName}</div>
          <div className="todayIs">TODAY IS {todaysDate}</div>

          <div className="reminders"><Table dark><thead><tr><th>Date</th><th>Reminder</th><th>actions</th></tr></thead><tbody>
            {
              filteredReminders.map(reminder => {
                return (
                  <tr key={reminder.id}>
                    <td>{reminder.date}</td><td>{reminder.message}</td><td><Button className="text-white" color="info" size="sm" style={{ height: '30px', width: '40px' }} 
                    onClick={
                      (event) => {
                        event.preventDefault()
                        setReminder(reminder)
                        toggle()
                        
                      }
                      //when user clicks here
                      //1 update state of reminder to equal reminder.id
                      //2 pass reminder id to reminder form
                      //3 use the reminder id in the reminder form component to render the edit modal
                    }>edit</Button> <Button className="text-white" color="info" size="sm" style={{ height: '30px', width: '60px' }} onClick={() => handleRelease(reminder.id)}>Delete</Button></td>





                  </tr>

                )
              })
            }
          </tbody></Table>
          </div>
          <div>
            <Button className="text-white" size="sm" style={{ height: '30px', width: '125px' }} color="info" onClick={toggle}>
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



