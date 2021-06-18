import React, { useContext, useEffect, useState } from "react"
import { ReminderContext } from "./RemindersProvider"
import { ReminderDetail } from "./RemindersDetail"
import { useHistory, Link, useParams } from "react-router-dom"
import { Table, thead, Button } from 'reactstrap';
import backgroundImg from '../Images/SNEAKERSBLURRED.jpg'
import "./ReminderList.css"

export const ReminderList = () => {
  const { reminders, getReminders, searchTerms, releaseReminder, updateReminder, getReminderById } = useContext(ReminderContext)

  // Since you are no longer ALWAYS displaying all of the reminders
  const [filteredReminders, setFiltered] = useState([])
  const [reminder, setReminder ] = useState({})

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
  // searchTerms will cause a change
  useEffect(() => {
    if (searchTerms !== "") {
      // If the search field is not blank, display matching reminders
      const subset = reminders.filter(reminder => reminder.message.toLowerCase().includes(searchTerms))
      setFiltered(subset)
    } else {
      // If the search field is blank, display all reminders
      setFiltered(reminders)
    }
  }, [searchTerms, reminders])

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

  const handleInputChange = (reminderId) => {
    console.log(reminder)
    updateReminder({
      id: reminderId,
      message: reminder.message,
      date: new Date().toLocaleTimeString() + " " + new Date().toLocaleDateString()
  })
    .then(() => {
      history.push(`/Reminders/`)
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
                   <td>{reminder.date}</td><td>{reminder.message}</td><td><Button className="text-white" color="info" size="sm" style={{ height: '30px', width: '40px' }} onClick={(event) => {
                     event.preventDefault()
                      history.push(`/Reminders/Details/${reminder.id}`)
                    }}>edit</Button> <Button className="text-white" color="info" size="sm" style={{ height: '30px', width: '60px' }} onClick={() => handleRelease(reminder.id)}>Delete</Button></td>
</tr>
                  
                )
              })
            }
            </tbody></Table>
            <Button className="text-white" size="sm" style={{ height: '30px', width: '125px' }} color="info" onClick={() => history.push("/Reminders/Create")}>
              New Reminder
            </Button>

          </div>
        </section>
      </div>

    </>
  )
}



