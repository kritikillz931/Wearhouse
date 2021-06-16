import React, { useContext, useEffect, useState } from "react"
import { ReminderContext } from "./RemindersProvider"
import { ReminderDetail } from "./RemindersDetail"
import { useHistory, Link } from "react-router-dom"
import { Table, thead, Button } from 'reactstrap';
import backgroundImg from '../Images/SNEAKERS.jpg'
import "./ReminderList.css"

export const ReminderList = () => {
  const { reminders, getReminders, searchTerms, releaseReminders } = useContext(ReminderContext)

  // Since you are no longer ALWAYS displaying all of the reminders
  const [ filteredReminders, setFiltered ] = useState([])
  const [ reminder, setReminder ] = useState('')
  const history = useHistory()

  // Empty dependency array - useEffect only runs after first render
  useEffect(() => {
      getReminders()
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

const handleRelease = () => {
  releaseReminders(reminder.id)
  .then(() => {
    history.push("/Reminders")
  })
}

return (
  <>
  
  <div style={sectionStyle}>
    <section class="ReminderContainer">
    <h1>Reminders</h1>

    <div className="reminders">
    {
      filteredReminders.map(reminder => {
        return (
          <section className="reminderList">
            <h3 className="reminder__message">{reminder.date} {reminder.message}</h3><Button onClick={() => {
                history.push(`/Reminders/${reminder.id}`)}}>edit</Button><Button onClick={handleRelease}>Delete</Button>

          </section>
        )
      })
    }
    <Button size="sm" style={{height: '30px', width : '125px'}} color="info" onClick={() => history.push("/Reminders/Create")}>
        New Reminder
    </Button>
    
    </div>
    </section>
    </div>

  </>
)
}



